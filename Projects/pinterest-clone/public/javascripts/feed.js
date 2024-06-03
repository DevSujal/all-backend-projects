let images = "";
for (let i = 0; i < 20; i++) {
  images += `<div class = "eachimage" style = "background :#${(
    Math.random() *
    0xfffff *
    1000000
  )
    .toString(16)
    .slice(
      0,
      6
    )}"><a href = https://picsum.photos/250/250?random=${i}><img src=https://picsum.photos/250/250?random=${i}></a></img></div>`;
}

document.querySelector("#images").innerHTML = images;

// let box = Array.from(document.getElementsByClassName("eachimage"));
// for (let i = 0; i < box.length; i++) {
//   box[i].style.background = "";
// }
