const tpl = `
<div class='modalContent'>
    <button type="button" class='closeModal'>
    <span>&times;</span>
    </button>
    <h3 class="title">{{title}}</h3>
    {{{form}}}
    <p id="formError" class="error" />
</div>
`;
export default tpl;
