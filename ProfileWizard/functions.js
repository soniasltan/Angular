const next = $("#next");
const back = $("#back");
const close = $("#close");
const $progress = $("#progressBar");

let page = 1;
let maxpage = 4;

const toNext = () => {
    const $next = $("#next");
    const $back = $("#back");
    const $close = $("#close");
    const $progress = $("#progressBar");

    let $currentPage = $("#step" + page);
    let $followingPage = $("#step" + (page + 1));
    let $followingBadge = $("#badge" + (page + 1));
    let currentProgress = page * 25;
    let nextProgress = ((page + 1) * 25);

    if (page === 1) {
        $currentPage.toggle();
        $back.toggle();
    } else if (page === maxpage - 1) {
        $currentPage.toggle();
        $next.toggle();
        $close.toggle();
    } else if (page != maxpage) {
        $currentPage.toggle();
    }
    $followingBadge.removeClass("bg-secondary").addClass("bg-success");
    $progress.removeClass("w-" + currentProgress).addClass("w-" + nextProgress).attr("aria-valuenow", nextProgress.toString());
    $followingPage.toggle();
    page++
}

const toBack = () => {
    const $next = $("#next");
    const $back = $("#back");
    const $close = $("#close");
    const $progress = $("#progressBar");

    let $currentPage = $("#step" + page);
    let $prevPage = $("#step" + (page - 1));
    let $currentBadge = $("#badge" + page);
    let currentProgress = page * 25;
    let backProgress = ((page - 1) * 25);

    if (page === maxpage) {
        $currentPage.toggle();
        $close.toggle();
        $next.toggle();
    } else if (page === 2) {
        $currentPage.toggle();
        $back.toggle();
    } else if (page != 1) {
        $currentPage.toggle();
    }
    $currentBadge.removeClass("bg-success").addClass("bg-secondary");
    $progress.removeClass("w-" + currentProgress).addClass("w-" + backProgress).attr("aria-valuenow", backProgress.toString());
    $prevPage.toggle();
    page--
}

const main = () => {
    const $next = $("#next");
    const $back = $("#back");
    $next.on("click", toNext);
    $back.on("click", toBack);
};

$(main);