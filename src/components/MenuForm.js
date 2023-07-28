import React, { useState } from 'react';

const MenuForm = ({ onAddMenu }) => {
  const [menu, setMenu] = useState(''); //사용자가 입력한 메뉴를 담는 상태변수

  // 입력했을때 실행되는 이벤트 함수
  const handleSubmit = (e) => {
    e.preventDefault(); //페이지 새로고침 방지
    if (menu.trim() === '') {  //사용자가 입력한 메뉴가 빈 문자열이면 알럿창으로 띄우고 다시 리턴
        alert('메뉴 추가부탁드립니다')
        return
    }; 
    // 사용자가 입력한 메뉴가 있다면 onAddMenu함수를 호출해 입력한 메뉴 추가
    onAddMenu(menu);
    setMenu(''); // 입력후 meun상태 초기화하여 입력창을 비움
  };

  return (
    // 메뉴를 입력하는 폼 생성
    <form onSubmit={handleSubmit} className='menuform'>

        {/* 사용자가 메뉴입력할수 있는 입력창 */}
      <input
        type="text"
        value={menu}
        onChange={(e) => setMenu(e.target.value)}
        placeholder="메뉴를 입력하세요"
      />

      <button type="submit">메뉴 추가</button>
    </form>
  );
};

export default MenuForm;
