import{u as p,a as h,r,b as x,j as s,B as f}from"./index-8c2f2b2d.js";import{P as j}from"./PageNav-5e571e5b.js";import{s as a}from"./Login.module-546e6687.js";import"./Logo-419999d7.js";function b(){const{login:m,isAuthenticated:o}=p(),{fetchCities:n}=h(),[t,c]=r.useState(""),[i,u]=r.useState("");function d(e){e.preventDefault(),t&&i&&m(t,i)}const l=x();return r.useEffect(()=>{o&&(n(),l("/app/cities",{replace:!0}))},[o,l,n]),s.jsxs("main",{className:a.login,children:[s.jsx(j,{}),s.jsxs("form",{className:a.form,onSubmit:d,children:[s.jsxs("div",{className:a.row,children:[s.jsx("label",{htmlFor:"email",children:"Email address"}),s.jsx("input",{type:"email",id:"email",onChange:e=>c(e.target.value),value:t})]}),s.jsxs("div",{className:a.row,children:[s.jsx("label",{htmlFor:"password",children:"Password"}),s.jsx("input",{type:"password",id:"password",onChange:e=>u(e.target.value),value:i})]}),s.jsx("div",{children:s.jsx(f,{type:"primary",children:"Login"})})]})]})}export{b as default};
