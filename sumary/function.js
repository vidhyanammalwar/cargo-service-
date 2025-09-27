document.querySelectorAll('[data-href]').forEach(opt =>{
    opt.addEventListener("click" , (e)=> {
        let pos = e.target.dataset.href;
        let x = document.querySelector('[data-pos="'+pos+'"]').offsetTop;
        document.querySelector(".content-box").scrollTo({ top: x, behavior: 'smooth' });
        document.querySelectorAll('[data-href]').forEach(opt =>{
            opt.classList.remove("active")
        })
        e.target.classList.add("active")
    })
})
