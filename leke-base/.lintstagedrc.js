module.exports = {
    "*.{ts,tsx}": () =>{
        return `tsc --noEmit --jsx react`
    },
    "*.{js,ts,tsx,jsx,md}":(filenames)=>{
        return `eslint --fix ${filenames.join(' ')}`
    }
}