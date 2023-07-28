import React, { useState, useEffect } from 'react';
import './App.scss';
import MenuForm from './components/MenuForm';
import MenuList from './components/MenuList';

function App() {
  const [menus, setMenus] = useState([]); //사용자가 입력한 메뉴 리스트 담는 배열
  const [randomMenu, setRandomMenu] = useState(null); //랜덤으로 선택된 메뉴를 담는 배열
  const [isRotating, setIsRotating] = useState(false); // 메뉴 리스트가 돌아가고있는지 체크하는 상태 변수
  const [rotationSpeed, setRotationSpeed] = useState(100); // 메뉴 리스트가 돌아가는 속도 조절 상태변수
  

  //useEffect 훅을 사용 메뉴 리스트가 돌아가는 동작 구현
  useEffect(() => {
    if (isRotating) {
      const timer = setInterval(() => {
        const randomIndex = Math.floor(Math.random() * menus.length);
        setRandomMenu(menus[randomIndex]);
      }, rotationSpeed);

      return () => {
        clearInterval(timer);
      };
    }
  }, [isRotating, menus, rotationSpeed]);

  // 입력한 메뉴를 배열에 추가 
  //handleAddMenu 함수는 매개변수 menu를 받아와서 menus 배열에 새로운 메뉴를 추가
  const handleAddMenu = (menu) => {
    setMenus([...menus, menu]); //...는 전개 연산자
  };

  // 입력한 메뉴를 배열에 삭제
  const handleDeleteMenu = (index) => {
    const updatedMenus = [...menus];
    updatedMenus.splice(index, 1);
    setMenus(updatedMenus);
  };

  //메뉴 돌리기 버튼 클릭시 메뉴 돌리기
  const handleRotate = () => {
    if (menus.length > 0) {
      setIsRotating(true);

      setTimeout(() => {
        setIsRotating(false);
        const randomIndex = Math.floor(Math.random() * menus.length);
        setRandomMenu(menus[randomIndex]);
      }, 3000);
    }
  };

  //다시 돌리기 클릭시 랜덤으로 선택된 메뉴 다시 초기화
  const handleRestart = () => {
    setRandomMenu(null);
  };

  return (
    <div className='main'>
      <h1>점심메뉴 랜덤선택 게임</h1>
      <MenuForm onAddMenu={handleAddMenu}/>
      <MenuList menus={menus} onDeleteMenu={handleDeleteMenu} />
      
      <div className="rotation-container">
        <div className={`menu-container ${isRotating ? 'rotating' : ''}`}>
          {menus.map((menu, index) => (
            <div key={index} className={`menu-item ${randomMenu === menu ? 'selected' : ''}`}>
              {menu}
            </div>
          ))}
        </div>
        <p>메뉴를 추가해주세요</p>
        <button onClick={handleRotate} disabled={isRotating || menus.length === 0}>
          메뉴돌리기
        </button>
        {randomMenu && (
          <div className="popup">
            <h2>오늘의 선택</h2>
            <p>{randomMenu}</p>
            <button onClick={handleRestart} className='popbtn'>다시돌리기</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;