export function scrollDown(scrollAmount, element) {
  return new Promise((resolve, reject) => {
    let e = document.querySelector("." + element);
    if (e) {
      let amount = scrollAmount;
      amount -= 100;
      e.scrollTo(0, amount);
      resolve(amount);
    } else {
      reject("failed");
    }
  });
}

export function scrollUp(scrollAmount, element) {
  return new Promise((resolve, reject) => {
    let e = document.querySelector("." + element);
    if (e) {
      let amount = scrollAmount;
      amount += 100;
      e.scrollTo(0, amount);
      resolve(amount);
    } else {
      reject("failed");
    }
  });
}
