import React, { useEffect, useState } from 'react';
import { OtpType, StorageKey, TStatusShake } from "../../constants";
const HexTileLayout: React.FC = () => {
  const [availableLetters, setAvailableLetters] = useState<string[]>([]); // Lưu chữ cái từ API

  // Danh sách các chữ cái cho từng dòng
  const firstRow = ['m', 'y'];
  const secondRow = ['l', 'u', 'm2', 'i', 't', 'e', 'l2'];

  // Gọi API để lấy danh sách chữ cái có sẵn
  useEffect(() => {
    const fetchAvailableLetters = async () => {
      try {
        const baseURL = process.env.NEXT_PUBLIC_API_URL || window.location.origin
        const token = 'your-jwt-token';  // Thay thế với token thực tế

        const response = await fetch(baseURL + '/api/lucky/letter', {
          method: 'POST',  // Hoặc POST nếu cần
          headers: {
            'Content-Type': 'application/json',  // Đảm bảo rằng bạn đang gửi dữ liệu JSON
            'Authorization': `Bearer ${localStorage.getItem(StorageKey.accessToken)}`,  // Thêm JWT vào header
          },
        });

        const data = await response.json();
        const letters = data.map((item) => item.gift.id);
        setAvailableLetters(letters); // Giả sử API trả về mảng chữ cái ["m", "y", "l", ...]
      } catch (error) {
        console.error('Error fetching letters:', error);
      }
    };

    fetchAvailableLetters();
  }, []);

  // Hàm render danh sách các chữ cái thành hình ảnh
  const renderImages = (letters: string[]) =>
    letters.map((letter, index) => (
      <img
        key={index}
        src={`/images/letter_hex/${letter}.png`}
        alt={letter.toUpperCase()}
        style={{
          width: 50,
          height: 50,
          padding: 0,
          margin: '0 -7px -17px 0',
          opacity: availableLetters.includes(letter.toUpperCase()) ? 1 : 0.5, // Đặt opacity dựa trên danh sách có sẵn
        }}
      />
    ));

  return (
    <div
      style={{
        fontFamily: 'Arial, sans-serif',
        backgroundColor: '#d7f4fc',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        marginTop: 50,
        padding: 0,
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 9 }}>
        {/* Render dòng 1 */}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          {renderImages(firstRow)}
        </div>

        {/* Render dòng 2 */}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          {renderImages(secondRow)}
        </div>
      </div>
    </div>
  );
};

export default HexTileLayout;
