const information = {
    file0: {
        title: "Аркадий любит стаяк Раналда",
        desc: "У Аркадия есть крутой стаяк Раналда это круто я такое конечно же поддерживаю."
    },
    file1: {
        title: "Аркадий был на острове Эпштейна",
        desc: "Аркадий еще в ■■■■ году посещал остров Эпштейна. Он прилетел туда и конечно же поздоровался со свои любимым дядей Эпштейном. Затем Аркадий ■■■■■ ■■■■■ ■■■■■. Ему очень понравилось, дальше он неоднократно посещал данный чудо-остров."
    }
}

function search() {
    const inputField = document.getElementById("inputSearch");
    const searchValue = inputField.value.toLowerCase();
    let results = [];

    for (let key in information) {
        let obj = information[key];
        if (obj.title.toLowerCase().includes(searchValue)) {
            results.push("<div class='block'><h1>" + obj.title + "</h1>" + "<p>" + obj.desc + "</p>" + "</div>");
        }
    }

    const searchContent = document.getElementById("searchContent");

    if (results.length > 0 && searchValue) {
        searchContent.innerHTML = results.join("");
    } else {
        searchContent.innerHTML = "<p class='nothing'>Ничего не найдено</p>";
    }
}