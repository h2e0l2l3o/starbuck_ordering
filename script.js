document.addEventListener("DOMContentLoaded", () => {
  const menuItems = [
    {
      name: "아메리카노",
      price: "₩4,100",
      category: "커피&에스프레소",
      src: "./images/americano.png",
    },
    {
      name: "카페라떼",
      price: "₩4,600",
      category: "커피&에스프레소",
      src: "./images/cafeLatte.png",
    },
    {
      name: "카푸치노",
      price: "₩4,600",
      category: "커피&에스프레소",
      src: "./images/cappuchino.png",
    },
    {
      name: "카라멜 마끼아또",
      price: "₩5,800",
      category: "커피&에스프레소",
      src: "./images/caramelM.png",
    },
    {
      name: "자바 칩",
      price: "₩6,300",
      category: "프라푸치노",
      src: "./images/javachipF.png",
    },
    {
      name: "화이트 초콜릿 모카",
      price: "₩6,200",
      category: "프라푸치노",
      src: "./images/whiteChocolateF.png",
    },
    {
      name: "모카/카라멜",
      price: "₩6,100",
      category: "프라푸치노",
      src: "./images/caramelF.png",
    },
    {
      name: "딸기 요거트",
      price: "₩6,300",
      category: "블렌디드",
      src: "./images/strawberryB.png",
    },
    {
      name: "익스트림 티",
      price: "₩6,300",
      category: "블렌디드",
      src: "./images/extreamTeaB.png",
    },
    {
      name: "망고 바나나",
      price: "₩6,600",
      category: "블렌디드",
      src: "./images/mangoBananaB.png",
    },
    {
      name: "피치 레몬",
      price: "₩6,600",
      category: "블렌디드",
      src: "./images/peachLemonB.png",
    },
  ];
  // map은 배열을 순회하면서 각 요소를 변환하고 새로운 배열을 반환.
  // forEach는 배열을 순회하면서 특정 작업을 수행하되, 새로운 배열을 반환하지 않음.

  //₩4,100 이런 금액 표시를 숫자로 온전히 바꾸는 함수
  function priceToNumber(money) {
    return parseInt(money.replace(/[^\d]/g, ""), 10);
  }

  // const menuList = document.querySelector("#menu-list");
  const menuList = document.getElementById("menu-list");
  let option;
  // 전체(0), 식사류(1), 면류(2), 음료(3), keyword(4)

  function sortMenu(option, word = "") {
    let filteredItems;

    switch (option) {
      case 0: // 전체
        filteredItems = menuItems;
        break;
      case 1: // 식사류
        // filter 메소드는 배열에만 쓰임
        filteredItems = menuItems.filter(
          (item) => item.category === "커피&에스프레소"
        );
        break;
      case 2: // 면류
        filteredItems = menuItems.filter(
          (item) => item.category === "프라푸치노"
        );
        break;
      case 3: // 음료
        filteredItems = menuItems.filter(
          (item) => item.category === "블렌디드"
        );
        break;
      case 4: // 키워드 검색
        filteredItems = menuItems.filter(
          (item) =>
            item.name.includes(word) ||
            item.category.includes(word) ||
            item.price.includes(word)
        );
        break;
      default:
        filteredItems = menuItems;
        break;
    }

    // 기존 메뉴 리스트 내용 제거
    // menuList.innerHTML = "";

    // '주문 추가' 버튼에는 각 메뉴 아이템의 인덱스를 data-index 속성으로 저장.
    // 클릭 시 해당 메뉴를 식별
    // menuList.innerHTML = filteredItems
    //   .map(
    //     (item, index) => `<div class="card" style="width: 18rem">
    //     <img src=${item.src} class="card-img-top" alt="${
    //       item.name + " 이미지"
    //     }" />
    //     <div class="card-body">
    //       <h4 class="card-title menu_item">${item.name}</h4>
    //       <button class="btn btn-success order-btn" data-index="${index}">주문하기</button>
    //     </div>
    //     <ul class="list-group list-group-flush">
    //       <li class="list-group-item category">${item.category}</li>
    //       <li class="list-group-item price">${item.price}</li>
    //     </ul>
    //   </div>`
    //   )
    //   .join("");
    menuList.innerHTML = filteredItems
      .map(
        (item, index) => `<div class="card" style="width: 18rem">
        <img src=${item.src} class="card-img-top" alt="${
          item.name + " 이미지"
        }" />
        <div class="card-body">
          <h4 class="card-title menu_item">${item.name}</h4>
          <button class="btn btn-success order-btn" data-name="${
            item.name
          }">주문하기</button>
        </div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item category">${item.category}</li>
          <li class="list-group-item price">${item.price}</li>
        </ul>
      </div>`
      )
      .join("");
  }

  sortMenu(0); //default로 전체 메뉴 보여줌

  //카테고리 별
  const categoryBtn = document.querySelector(".category_text");
  const all = document.querySelector(".all");
  const meal = document.querySelector(".coffee");
  const noodle = document.querySelector(".frap");
  const drinks = document.querySelector(".blended");

  all.addEventListener("click", function () {
    categoryBtn.textContent = "전체";
    sortMenu(0);
  });

  meal.addEventListener("click", function () {
    categoryBtn.textContent = "커피&에스프레소";
    sortMenu(1);
  });

  noodle.addEventListener("click", function () {
    categoryBtn.textContent = "프라푸치노";
    sortMenu(2);
  });

  drinks.addEventListener("click", function () {
    categoryBtn.textContent = "블렌디드";
    sortMenu(3);
  });

  //키워드 별
  const keyword = document.getElementById("keyword");
  const searchBtn = document.querySelector(".search-btn");

  searchBtn.addEventListener("click", function () {
    sortMenu(4, keyword.value);
  });

  ////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////// 여기서부터 가격 관련 기능///////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////

  let order = {};
  let totalPrice = 0;

  const menuContainer = document.getElementById("menu-list");
  const orderList = document.getElementById("order-list");
  const totalPriceElement = document.getElementById("total-price");
  const submitOrderButton = document.getElementById("submit-btn");

  // TODO-2: 주문 추가 로직을 작성하세요.
  // 힌트: menuContainer에 이벤트 리스너를 추가하고, 이벤트가 발생한 대상이 버튼인지 확인합니다.

  // 버튼의 data-index 속성을 이용해 어떤 메뉴가 클릭되었는지 파악한 후,
  // 해당 메뉴의 수량을 증가시키거나 새로 추가하세요.

  menuContainer.addEventListener("click", (event) => {
    if (event.target.tagName === "BUTTON") {
      // 클릭된 버튼의 메뉴 아이템을 주문에 추가하는 로직 작성

      const targetName = event.target.getAttribute("data-name");
      const selectedItem = menuItems.find((item) => item.name === targetName);
      const drink = selectedItem.name;

      // const drink = menuItems[targetName].name;
      const drink_price = priceToNumber(selectedItem.price);

      // 메뉴 이름을 키로 사용하여 주문 추가
      if (order[drink]) {
        // 이미 존재하면 수량 증가
        order[drink].quantity += 1;
        totalPrice += drink_price;
      } else {
        // 새로 추가
        order[drink] = {
          quantity: 1,
          price: drink_price,
        };
        totalPrice += drink_price;
      }
      updateOrderList();
    }
  });

  // 이후, 총 가격(totalPrice)을 업데이트하고,
  // 주문 목록을 업데이트하는 updateOrderList 함수를 호출하세요.

  // 주문 내역 업데이트 함수
  function updateOrderList() {
    orderList.innerHTML = "";
    for (let itemName in order) {
      const orderItem = order[itemName];
      const orderItemElement = document.createElement("li");
      orderItemElement.innerHTML = `
                ${itemName} - ₩${orderItem.price.toLocaleString()} x${
        " " + orderItem.quantity
      }
                <button class="remove btn btn-danger" data-item="${itemName}">삭제</button>
            `;
      orderList.appendChild(orderItemElement);
    }
    totalPriceElement.textContent = totalPrice.toLocaleString();
  }

  // 아이템 삭제 로직
  orderList.addEventListener("click", (event) => {
    const itemName = event.target.getAttribute("data-item");
    if (event.target.classList.contains("remove")) {
      totalPrice -= order[itemName].price * order[itemName].quantity;
      delete order[itemName];
      updateOrderList();
    }
  });

  // 주문 제출 로직
  submitOrderButton.addEventListener("click", () => {
    if (Object.keys(order).length > 0) {
      alert("주문해 주셔서 감사합니다!");
      order = {};
      totalPrice = 0;
      updateOrderList();
    } else {
      alert("주문 내역이 비어 있습니다!");
    }
  });

  // 카트 버튼 누르면 주문서 튀어나오기
  let cartBtn = document.getElementById("cart-btn");
  let orderArea = document.querySelector(".order-space");
  let hideBtn = document.getElementById("hide-btn");

  cartBtn.addEventListener("click", function () {
    cartBtn.style.display = "none";
    orderArea.style.display = "flex";
  });

  hideBtn.addEventListener("click", function () {
    cartBtn.style.display = "flex";
    orderArea.style.display = "none";
  });
});
