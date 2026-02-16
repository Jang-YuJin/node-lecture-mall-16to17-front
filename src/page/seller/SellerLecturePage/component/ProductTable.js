import '../style/ProductTable.style.css'
import React from "react";
import Button from "react-bootstrap/Button";
import { currencyFormat } from "../../../../utils/number";

const ProductTable = ({ data, deleteItem, openEditForm }) => {
  return (
    <div className="lecture-table-wrapper">
      {data.length > 0 ? (
        data.map((item, index) => (
          <div key={item._id} className="lecture-row">
            {/* 썸네일 */}
            <div className="lecture-thumb">
              <img src={item.img} alt={item.name} />
            </div>

            {/* 정보 */}
            <div className="lecture-info">
              <div className="lecture-title">
                {item.name}
                {item.dscnt && <span className="badge discount">할인 ({item.dscntRt}%)</span>}
              </div>

              <div className="lecture-meta">
                <span className={`badge status ${item.status}`}>
                  {item.status === "active" ? "판매중" : "비공개"}
                </span>
                <span className="price">
                  ₩ {currencyFormat(item.price)}
                </span>
              </div>

              <div className="category-list">
                {item.ctgry.map((c, idx) => (
                  <span key={idx} className="category-pill">
                    #{c}
                  </span>
                ))}
              </div>
            </div>

            {/* 액션 */}
            <div className="lecture-actions">
              <Button
                size="sm"
                variant="outline-primary"
                onClick={() => openEditForm(item)}
              >
                수정
              </Button>
              <Button
                size="sm"
                variant="outline-danger"
                onClick={() => deleteItem(item._id)}
              >
                삭제
              </Button>
            </div>
          </div>
        ))
      ) : (
        <div className="empty-state">등록된 강의가 없습니다 🍪</div>
      )}
    </div>
  );
};

export default ProductTable;
