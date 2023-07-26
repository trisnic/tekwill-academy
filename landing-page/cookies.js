console.log ('cookie', document.cookie )

const setCookie = (name, value, daysToExpire) => {

    let date = new Date();
    date.setTime(date.getTime() + daysToExpire * 24 * 60 * 60 * 1000);
    const expireDate = date.toUTCString();

    document.cookie = name + "=" + value + 'expires=' + expireDate;

}

setCookie('nameOfCookie', 'calueOfCookie', 7);