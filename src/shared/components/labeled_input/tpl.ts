const tpl = `
<label class='title' for={{id}}>{{label}}</span></label>
<div class="inputContainer">
    <input id={{id}} type={{type}} name={{name}} placeholder='{{placeholder}}' value='{{value}}' class='value' />
    <p id='error-{{formId}}-{{name}}' class='error'>{{error}}</p>
</div>  
`;

export default tpl;
