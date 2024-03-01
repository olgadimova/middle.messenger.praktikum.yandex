const tpl = `
<div class='modalContent'>
    <span class='closeModal' data-toggle={{modalId}}>&times;</span>
    <h3 class="title">{{title}}</h3>
    <form class='modalForm'>
       {{{fields}}}
    </form>
</div>
`;
export default tpl;
