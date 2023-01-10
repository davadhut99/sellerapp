
const productPrice = document.getElementById("productprice");
const productName = document.getElementById("productname");
const tableNumber = document.getElementById("tablenumber");
const addToBill = document.getElementById("addtobill");

const tb1 = document.getElementById('table1');
const tb2 = document.getElementById('table2');
const tb3 = document.getElementById('table3');


const endPoint = '17d30812ef9a4625b027669c882eeb18';
addToBill.addEventListener("click", function (e) {
  e.preventDefault();
  const order = {
    tbNumber: tableNumber.value,
    pPrice: productPrice.value,
    pName: productName.value
  };

  addOrderToTable(order);
  //console.log(order);
  // Clear fields
  productPrice.value = '';
  productName.value = '';
});


function addOrderToTable(order) {
  if (productPrice.value == '' || productName.value == '') {
    alert("Enter All Details of the product");
  } else {
    axios
      .post(
        `https://crudcrud.com/api/${endPoint}/restapp`, order
      )
      .then((response) => {
        //console.log(response);
        showTableWithOrder(response.data);
      })
      .catch((err) => {
        document.body.innerHTML =
          document.body.innerHTML + "<h4> Something went wrong! </h4>";
        console.log(err);
      });

  }
};


window.addEventListener("DOMContentLoaded", () => {
  axios
    .get(
      `https://crudcrud.com/api/${endPoint}/restapp`
    )
    .then((response) => {
      console.log(response);
      for (let i = 0; i < response.data.length; i++) {
        showTableWithOrder(response.data[i]);
      }
    })
    .catch((err) => {
      console.log(err);
    });
});


function showTableWithOrder(ele) {
  console.log(ele)
  if (tb1.id == ele.tbNumber) {
    const parentNode = document.getElementById("listoforders1");
    childHTML = `<li id=${ele._id}> ${ele.pPrice} - ${ele.pName} - ${ele.tbNumber}
    <button onclick= "deleteOrder('${ele._id}','${ele.tbNumber}')"> Delete </button></li><br>`;
    parentNode.innerHTML = parentNode.innerHTML + childHTML;
  }
  else if (tb2.id == ele.tbNumber) {
    const parentNode = document.getElementById("listoforders2");
    childHTML = `<li id=${ele._id}> ${ele.pPrice} - ${ele.pName} - ${ele.tbNumber}
    <button onclick= "deleteOrder('${ele._id}','${ele.tbNumber}')"> Delete </button></li><br>`;
    parentNode.innerHTML = parentNode.innerHTML + childHTML;

  } else if (tb3.id == ele.tbNumber) {
    const parentNode = document.getElementById("listoforders3");
    childHTML = `<li id=${ele._id}> ${ele.pPrice} - ${ele.pName} - ${ele.tbNumber}
    <button onclick= "deleteOrder('${ele._id}','${ele.tbNumber}')"> Delete </button></li><br>`;
    parentNode.innerHTML = parentNode.innerHTML + childHTML;

  }
}

function deleteOrder(eleId, tbNumber) {
  axios
    .delete(
      `https://crudcrud.com/api/${endPoint}/restapp/${eleId}`
    )
    .then((response) => {
      console.log(response);
      removeOrderFromScreen(eleId, tbNumber);
    })
    .catch((err) => {
      console.log(err);
    });
}

function removeOrderFromScreen(eleId, tbNumber) {
  console.log(eleId);
  let childNodeToBeDeleted = document.getElementById(eleId);
  if (tb1.id == tbNumber) {
    const parentNode = document.getElementById("listoforders1");
    if (childNodeToBeDeleted) {
      parentNode.removeChild(childNodeToBeDeleted);
    }
  }
  else if (tb2.id == tbNumber) {
    const parentNode = document.getElementById("listoforders2");
    if (childNodeToBeDeleted) {
      parentNode.removeChild(childNodeToBeDeleted);
    }
  } else if (tb3.id == tbNumber) {
    const parentNode = document.getElementById("listoforders3");
    if (childNodeToBeDeleted) {
      parentNode.removeChild(childNodeToBeDeleted);
    }
  }
}
//3979ff71df424e47a582010f2e9a8536
//https://crudcrud.com/api/3979ff71df424e47a582010f2e9a8536