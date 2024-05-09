const topbar = document.getElementById('topbar');
const logo = document.getElementById('logo');
const scrollbar = document.getElementById('scrollbar');

const content = document.getElementById('content');
const panels = document.querySelectorAll('.panel');
const video = document.getElementById('video');

var scrool = 1;

function pageLoad() {
    content.style.display = 'flex';
    scrollbar.classList.add('active');
    topbar.classList.remove('active');
    panels[0].classList.add('active');

    panels.forEach((panel, index) => {
        let element = document.createElement('div');
        let c = document.createElement('span');
        c.classList.add('current');
        element.appendChild(c);

        scrollbar.appendChild(element);
    })

   

}

window.onload = () => {
    //logo.src = 'assets/logo.svg';
    logo.contentDocument.querySelectorAll("animate").forEach((element) => {
        element.beginElement();
    });
    logo.contentDocument.addEventListener("click", () => {
        window.location.reload();
    })
    setTimeout(() => {
        pageLoad();
    }, 1000);
}

window.onwheel = (e) => {
    scrool = Math.max(1, Math.min(scrool+e.deltaY, window.innerHeight * panels.length));

    panels.forEach((panel, index) => {
        if(index == Math.floor(((scrool-1)/window.innerHeight)) ) {
            panel.classList.add('active');
            document.body.id = panel.id.replace('-panel', '');
        } else {
            if(panel.classList.contains('active') && index == 0) {
                video.pause();
            }

            panel.classList.remove('active');
        }
        if(panel.classList.contains('active')) scrollbar.children[index].children[0].style.height = `${Math.min((scrool/window.innerHeight) * 100 - 100 * index)}%`;
        else {
            scrollbar.children[index].children[0].style.height = index < Math.floor((scrool/window.innerHeight)) ? '100%' : '0%' ;
        }
        
    })

    logo.parentNode.classList.toggle('short', scrool > 1);
}