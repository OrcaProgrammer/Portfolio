
export function getInputFromHtml(selector) {
    const inputElements = document.querySelectorAll(selector);
    const inputs = [];
    inputElements.forEach(element => {
        inputs.push(Number(element.value));
    });
    return inputs;
}