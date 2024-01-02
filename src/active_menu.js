'use strict';

//구현 계획
// 1. 모든 섹션 요소들과 메뉴 아이템들을 가지고온다.

// 2. intersectionObserver를 사용해서 모든 섹션을 관찰해야 한다.
// 3. 보여지는 섹션에 해당하는 메뉴 아이템을 활성화 시킨다.
// 보여지는 섹션 : 
// -다수의 섹션이 동시에 보여진다면, 가장 첫번째 섹션을 선택
// -마지막 contact 섹션이 보여진다면, 그러면 가장 마지막 섹션을 선택

const sectionIDs = ['#home','#about','#skills','#Worked','#Testimonials','#Contact'];
const sections = sectionIDs.map((id) => document.querySelector(id));
const navItems = sectionIDs.map(id => document.querySelector(`[href="${id}"]`));

const visibleSections = sectionIDs.map(() => false);

let activeNavItem = navItems[0];

//console.log(navItems);

const options = {
    rootMargin: '-20% 0px 0px 0px',
    threshold: [0, 0.98],
};
const observer = new IntersectionObserver(observercallback, options);
sections.forEach(section => observer.observe(section));

function observercallback(entries) {
    let selectLastone;
    entries.forEach(entry => {
        const index = sectionIDs.indexOf(`#${entry.target.id}`);
        visibleSections[index] = entry.isIntersecting;
        selectLastone =
        index === sectionIDs.length - 1 && 
        entry.isIntersecting && 
        entry.intersectionRatio >= 0.93;

    });
    //console.log('무조건 라스트 섹션!', selectLastone);
    //console.log(visibleSections);

    const navIndex = selectLastone 
    ? sectionIDs.length - 1 
    : findFirstIntersecting(visibleSections);
    //console.log(sectionIDs[navIndex]);

    selectNavItem(navIndex);

}


function findFirstIntersecting(intersections){
    const index = intersections.indexOf(true);
    return index >= 0 ? index : 0;

}

function selectNavItem(index){
    
    const navItem = navItems[index];
    if(!navItem) return;
    activeNavItem.classList.remove('active');
    activeNavItem = navItem;
    activeNavItem.classList.add('active');
}