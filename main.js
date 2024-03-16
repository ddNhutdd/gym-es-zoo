const  generateId = () => {
    return Math.random().toString(36).substring(2, 9) + Date.now();
}

let mainContent = [
    {
        id: generateId(),
        name: 'tiger'
    },
    {
        id: generateId(),
    name: 'cat'
    },
    {
        id: generateId(),
        name: 'dog'
    }
]

const  deleteClickHandle = (id) => {
    mainContent = mainContent.filter(item => item.id !== id); 
    renderMainData(mainContent);
}

const debounce = (func, delay) => {
    let timeout;
  
    return function (...args) {
      if (timeout) {
        clearTimeout(timeout);
      }
  
      timeout = setTimeout(() => {
        func(...args);
      }, delay);
    };
  }

const submitHandle = (ev) => {
    ev.preventDefault();
    const inputElement = document.getElementById("nameInput");
    const formElement = document.getElementById("form");
    if(!inputElement || !formElement) return;
    const newContent = {
        id: generateId(),
        name: inputElement.value
    }
    mainContent.push(newContent);
    renderMainData(mainContent);
    formElement.reset();
}

const renderMainData = (mainContent) => {
    const containerElement = document.getElementById('bodyTable');
    if(!containerElement) return;
    containerElement.innerHTML = ``;
    mainContent.map(item => {
        containerElement.insertAdjacentHTML("afterbegin", `<tr>
        <td class="align-middle">${item.name}</td>
        <td>
            <Buton type="button" class="btn btn-danger" onclick="deleteClickHandle('${item.id}')" >xoá</Buton>
        </td>
    </tr>`)
    })
}

const search = () => {
    const input = document.getElementById('searchInput');
    if(!input) return;

    const searchString = input.value.toLowerCase();
    if(!searchString) {
        renderMainData(mainContent);
        return;
    }
    const searchResult = mainContent.filter(item => item.name.toLowerCase().includes(searchString))
    renderMainData(searchResult)
}

const searchDebounced = debounce(search, 1000);

const searchKeyupHandle = () => {
    searchDebounced();
}

const printListAnimal = () => {
    const container = document.getElementById('listAnimal');
    if(!container) return;
    container.innerHTML = '';
      const list = new Set(mainContent.map(item => item.name));
    console.log(list);
    const result = Array.from(list);
    result.map(item => {
        container.insertAdjacentHTML("beforeend", `<li>${item}</li>`)
    })

}


renderMainData(mainContent)