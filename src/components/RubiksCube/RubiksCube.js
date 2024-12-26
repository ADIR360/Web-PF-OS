import React, { useEffect, useRef } from 'react';
import './RubiksCube.css';

const colors = ['blue', 'green', 'white', 'yellow', 'orange', 'red'];

function RubiksCube() {
  const pivotRef = useRef(null);
  const sceneRef = useRef(null);
  const guideRef = useRef(document.createElement('div'));

  useEffect(() => {
    assembleCube();
  }, []);

  const mx = (i, j) => ([2, 4, 3, 5][j % 4 | 0] + (i % 2) * ((j | 0) % 4 * 2 + 3) + 2 * Math.floor(i / 2)) % 6;

  const getAxis = (face) => String.fromCharCode('X'.charCodeAt(0) + Math.floor(face / 2));

  const assembleCube = () => {
    const pieces = Array.from(document.getElementsByClassName('piece'));

    function moveTo(face) {
      id += 1 << face;

      const newDiv = createDiv();
      const attribute = `sticker ${colors[face]}`;

      pieces[i].children[face]
        .appendChild(newDiv)
        .setAttribute('class', attribute);

      const axis = getAxis(face);
      const value = (face % 2) * 4 - 2;

      return `translate${axis}(${value}em)`;
    }

    for (var id, x, i = 0; (id = 0), i < 26; i++) {
      x = mx(i, i % 18);

      const transform = `rotateX(0deg)${moveTo(i % 6)}$ {
        i > 5
          ? moveTo(x) + (i > 17 ? moveTo(mx(x, x + 2)) : '')
          : ''
      }`;

      pieces[i].style.transform = transform;
      pieces[i].setAttribute('id', `piece${id}`);
    }
  };

  const createDiv = () => document.createElement('div');

  const getPieceBy = (face, index, corner) => {
    const id = (1 << face) + (1 << mx(face, index)) + (1 << mx(face, index + 1)) * corner;
    return document.getElementById(`piece${id}`);
  };

  const swapPieces = (face, times) => {
    for (let i = 0; i < 6 * times; i++) {
      const piece1 = getPieceBy(face, Math.floor(i / 2), i % 2);
      const piece2 = getPieceBy(face, Math.floor(i / 2) + 1, i % 2);

      for (let j = 0; j < 5; j++) {
        const sticker1 = piece1.children[j < 4 ? mx(face, j) : face].firstChild;
        const sticker2 = piece2.children[j < 4 ? mx(face, j + 1) : face].firstChild;
        if (sticker1 && sticker2) {
          const className = sticker1.className;
          sticker1.className = sticker2.className;
          sticker2.className = className;
        }
      }
    }
  };

  const animateRotation = (face, cw, currentTime) => {
    const k = 0.3 * (face % 2 * 2 - 1) * (2 * cw - 1);
    const pieces = Array(9)
      .fill(document.getElementsByClassName('piece')[face])
      .map((value, index) => (index ? getPieceBy(face, Math.floor(index / 2), index % 2) : value));

    (function rotatePieces() {
      const passed = Date.now() - currentTime;
      const style = `rotate${getAxis(face)}(${k * passed * (passed < 300)}deg)`;

      pieces.forEach((piece) => {
        if (piece) {
          piece.style.transform = piece.style.transform.replace(/rotate.\(\S+\)/, style);
        }
      });

      if (passed >= 300) {
        swapPieces(face, 3 - 2 * cw);
      } else {
        requestAnimationFrame(rotatePieces);
      }
    })();
  };

  const mouseDown = (md_e) => {
    const pivot = pivotRef.current;
    const scene = sceneRef.current;
    const guide = guideRef.current;

    const startXY =
      pivot.style.transform.match(/-?\d+\.?\d*/g)?.map(Number) || [0, 0];

    const element = md_e.target.closest('.element');
    const face = Array.from((element || scene).parentNode.children).indexOf(element);

    const mouseMove = (mm_e) => {
      if (element) {
        const gid =
          /\d/.exec(document.elementFromPoint(mm_e.pageX, mm_e.pageY)?.id || '');

        if (gid && gid.input.includes('anchor')) {
          mouseUp();
          const e = element.parentNode.children[mx(face, Number(gid) + 3)].hasChildNodes();
          animateRotation(mx(face, Number(gid) + 1 + 2 * e), e, Date.now());
        }
      } else {
        const transform = `rotateX(${
          startXY[0] - (mm_e.pageY - md_e.pageY) / 2
        }deg)rotateY(${
          startXY[1] + (mm_e.pageX - md_e.pageX) / 2
        }deg)`;
        pivot.style.transform = transform;
      }
    };

    const mouseUp = () => {
      document.body.appendChild(guide);
      scene.removeEventListener('mousemove', mouseMove);
      document.removeEventListener('mouseup', mouseUp);
      scene.addEventListener('mousedown', mouseDown);
    };

    (element || document.body).appendChild(guide);
    scene.addEventListener('mousemove', mouseMove);
    document.addEventListener('mouseup', mouseUp);
    scene.removeEventListener('mousedown', mouseDown);
  };

  return (
    <div ref={sceneRef} className="scene">
      <div ref={pivotRef} className="pivot">
        {Array.from({ length: 26 }).map((_, i) => (
          <div key={i} className="piece">
            {Array.from({ length: 6 }).map((_, j) => (
              <div key={j} className="element"></div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default RubiksCube;