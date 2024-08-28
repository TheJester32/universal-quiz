(function() {
    const quiz = document.querySelector('.quiz__questions');
    const startQuiz = document.querySelector('.quiz__start-block button');
    const questionBlocks = document.querySelectorAll('.quiz__question-block');
    const answers = document.querySelectorAll('.quiz__option-answer');
    const finalBlock = document.querySelector('.quiz__final-block');
    const options = document.querySelectorAll('.quiz__option');
    const backButton = document.querySelectorAll('.quiz__button--back');
    const nextButton = document.querySelectorAll('.quiz__button--next');

    quiz.style.display = 'none';
    finalBlock.style.display = 'none';
    questionBlocks.forEach(el => el.style.display = 'none');
    answers.forEach(el => el.style.display = 'none');

    const disableOptionsChoice = function(){
        options.forEach(el => el.style.pointerEvents = 'none');
    }

    const enableOptionChoice = function(){
        options.forEach(el => el.style.pointerEvents = 'auto');
        answers.forEach((el) =>{
            if(!el.classList.contains('correct-answer-block')){
                el.style.display = 'none';
            }
        })
    }

    const openQuiz = function () {
        quiz.style.display = 'block';
        startQuiz.style.pointerEvents = 'none';
        questionBlocks[0].style.display = 'block';
        quiz.scrollIntoView();
    };

    startQuiz.addEventListener('click', openQuiz);

    const openAnswer = function (optionIndex) {
        answers[optionIndex].style.display = 'block';
        answers[optionIndex].scrollIntoView();
        disableOptionsChoice();
    };

    options.forEach((el, optionIndex) => {
        el.addEventListener('click', () => {
            openAnswer(optionIndex);
        });
    });

    backButton.forEach((el, index) =>{
        el.addEventListener('click', () =>{
            enableOptionChoice();
        })
    })

    const forwardToNewQuestionBlock = function (index) {
        questionBlocks[index].style.pointerEvents = 'none';
        questionBlocks[index].style.display = 'none';
        nextButton[index].style.display = 'none';
        let nextBlock =  questionBlocks[index + 1];
        if(nextBlock) {
            nextBlock.style.display = 'block';
            nextBlock.querySelectorAll('.quiz__option').forEach(el => el.style.pointerEvents = 'auto');
            nextBlock.scrollIntoView();
        }
        if(index === questionBlocks.length - 1){
            finalBlock.style.display = 'block';
            finalBlock.scrollIntoView();
        }
    }

    nextButton.forEach((el, index) =>{
        el.addEventListener('click', () =>{
            nextButton[index].style.pointerEvents = 'none';
            forwardToNewQuestionBlock(index);
        })
    })
})();
