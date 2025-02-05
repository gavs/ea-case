document.addEventListener("DOMContentLoaded", () => {
  let stickyPos;

  const progressNav = document.querySelector(".progress-navigation-wrapper");
  const section = document.querySelector("section");
  const button = document.querySelector(".button");

  const headers = [
    document.getElementById("section-header-1"),
    document.getElementById("section-header-2"),
    document.getElementById("section-header-3"),
    document.getElementById("section-header-4"),
    document.getElementById("section-header-5"),
  ];

  const lists = [
    document.getElementById("list-item-1"),
    document.getElementById("list-item-2"),
    document.getElementById("list-item-3"),
    document.getElementById("list-item-4"),
    document.getElementById("list-item-5"),
  ];

  const bars = [
    document.getElementById("bar-1-1"),
    document.getElementById("bar-1-2"),
    document.getElementById("bar-1-3"),
    document.getElementById("bar-2-1"),
    document.getElementById("bar-2-2"),
    document.getElementById("bar-2-3"),
    document.getElementById("bar-2-4"),
    document.getElementById("bar-2-5"),
    document.getElementById("bar-2-6"),
    document.getElementById("bar-2-7"),
    document.getElementById("bar-3-1"),
    document.getElementById("bar-3-2"),
    document.getElementById("bar-3-3"),
    document.getElementById("bar-3-4"),
    document.getElementById("bar-3-5"),
    document.getElementById("bar-3-6"),
    document.getElementById("bar-3-7"),
    document.getElementById("bar-3-8"),
    document.getElementById("bar-3-9"),
    document.getElementById("bar-3-10"),
    document.getElementById("bar-4-1"),
    document.getElementById("bar-4-2"),
  ];

  const subHeaders = [
    document.getElementById("section-paragraph-1-1"),
    document.getElementById("section-paragraph-1-2"),
    document.getElementById("section-paragraph-1-3"),
    document.getElementById("section-paragraph-2-1"),
    document.getElementById("section-paragraph-2-2"),
    document.getElementById("section-paragraph-2-3"),
    document.getElementById("section-paragraph-2-4"),
    document.getElementById("section-paragraph-2-5"),
    document.getElementById("section-paragraph-2-6"),
    document.getElementById("section-paragraph-2-7"),
    document.getElementById("section-paragraph-3-1"),
    document.getElementById("section-paragraph-3-2"),
    document.getElementById("section-paragraph-3-3"),
    document.getElementById("section-paragraph-3-4"),
    document.getElementById("section-paragraph-3-5"),
    document.getElementById("section-paragraph-3-6"),
    document.getElementById("section-paragraph-3-7"),
    document.getElementById("section-paragraph-3-8"),
    document.getElementById("section-paragraph-3-9"),
    document.getElementById("section-paragraph-3-10"),
    document.getElementById("section-paragraph-4-1"),
    document.getElementById("section-paragraph-4-2"),
  ];

  const subHeaderBarMapping = {
    0: [0], // subHeader 1 activates bar 1
    1: [1],
    2: [2],
    3: [3],
    4: [4],
    5: [5],
    6: [6],
    7: [7],
    8: [8],
    9: [9],
    10: [10],
    11: [11],
    12: [12],
    13: [13],
    14: [14],
    15: [15],
    16: [16],
    17: [17],
    18: [18],
    19: [19],
    20: [20],
    21: [21],
  };

  function toggleClass(element, condition, className) {
    if (element) {
      element.classList.toggle(className, condition);
    }
  }

  function handleScroll() {
    const sectionTop = section.getBoundingClientRect().top;
    toggleClass(progressNav, sectionTop <= stickyPos, "sticky");

    headers.forEach((header, index) => {
      if (!header || !lists[index]) return;

      const isActive = header.getBoundingClientRect().top <= stickyPos;
      toggleClass(lists[index], isActive, "active");

      if (index > 0) {
        toggleClass(lists[index - 1], isActive, "finished");
      }

    });

    subHeaders.forEach((subHeader, index) => {
      if (!subHeader) return;
      const isActive = subHeader.getBoundingClientRect().top <= stickyPos;
      if (subHeaderBarMapping[index]) {
        subHeaderBarMapping[index].forEach((barIndex) => {
          toggleClass(bars[barIndex], isActive, "active");
        });
      }
    });

    // Special handling for the last header
    const lastHeaderTop = headers[headers.length - 1]?.getBoundingClientRect().top;
    if (lastHeaderTop !== undefined && lastHeaderTop <= stickyPos) {
      toggleClass(lists[lists.length - 2], true, "finished");
      toggleClass(lists[lists.length - 1], true, "active");
    } else {
      toggleClass(lists[lists.length - 2], false, "finished");
      toggleClass(lists[lists.length - 1], false, "active");
      toggleClass(lists[lists.length - 1], false, "finished");
    }
  }

  function handleResize() {
    stickyPos = window.innerWidth < 768 ? 106 : 224;
  }

  function handleFinish() {
    toggleClass(lists[lists.length - 2], true, "finished");
    toggleClass(lists[lists.length - 1], true, "finished");
  }

  window.addEventListener("scroll", handleScroll);
  window.addEventListener("resize", handleResize);
  button.addEventListener("click", handleFinish);

  handleResize();
});
