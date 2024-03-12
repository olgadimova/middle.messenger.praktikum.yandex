const tpl = `
{{#if label}}
<label for={{id}} class='fieldLabel'>{{label}}</label>
{{/if}}
<input id={{id}} type={{type}} name={{name}} placeholder='{{placeholder}}' class="fieldInput {{class}}" 
data-formid="{{formId}}" />

<p id='error-{{formId}}-{{name}}' class='fieldError'>{{error}}</p>
`;

export default tpl;
