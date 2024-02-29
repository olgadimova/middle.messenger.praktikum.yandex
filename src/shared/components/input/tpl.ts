const tpl = `
<label for={{id}} class='fieldLabel'>{{label}}</label>
<input id={{id}} type={{type}} name={{name}} placeholder='{{placeholder}}' class='fieldInput' />

<p id='error-{{formId}}-{{name}}' class='fieldError'>{{error}}</p>
`;

export default tpl;
