import React from 'react';

// 부모 컴포넌트(App.js)에서 전달받은 메뉴 리스트 배열과 메뉴삭제 함수
const MenuList = ({ menus, onDeleteMenu }) => {
  return (
    <ul>
        {/* map을 사용하여 배열을 순회하면서 각 메뉴에 대한 li요소 생성 */}
      {menus.map((menu, index) => (
        // key={index}를 사용하여 각 요소에 고유한 키 즉 인덱스값을 부여함
        <li key={index}>
          {menu}
          <button onClick={() => onDeleteMenu(index)}>삭제</button>
        </li>
      ))}
    </ul>
  );
};

export default MenuList;
