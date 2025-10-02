(function(){
    const questions = document.querySelectorAll('.questions__title');

    questions.forEach(question => {
        question.addEventListener('click', () => {
            let parent = question.parentNode.parentNode; 
            let answer = question.nextElementSibling;
            let arrow = question.querySelector('.questions__arrow');

            parent.classList.toggle('questions__padding--add');
            arrow.classList.toggle('questions__arrow--rotate');

            if(answer.clientHeight === 0){
                answer.style.height = answer.scrollHeight + "px";
            } else {
                answer.style.height = "0";
            }
        });
    });
})();