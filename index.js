class SpinningDots extends HTMLElement {
    constructor() {
        super()
       const styles = window.getComputedStyle(this)
      //  const width =  28

      //  const width = parseInt(styles.width.replace('px','')) || 28
        const width = this.intFromPx(styles.width, 28)
        const circles = this.intFromPx(this.getAttribute('dots'), 8)
       // const circles = parseInt(this.getAttribute('dots'),10) || 8
        const circleRadius =  this.intFromPx(styles.strokeWidth,(2/28) * width , 1)
       // const circleRadius =  (2/28) * width
      //  const strokeWidth = this.intFromPx(styles.strokeWidth, (4 / 28) * width, 1)
     //   const circles = this.intFromPx(this.getAttribute('dots'), 8)
        const root = this.attachShadow({ mode: 'open' }) // Notre shadow DOM
        root.innerHTML = `<div>
    ${this.buildStyle(width, circleRadius * 2, circles)}
 
     
            ${this.buildTrail(width / 2 - circleRadius, circleRadius * 2)}
    ${this.buildCircles(width, circles, circleRadius)}
 
    </div>`
    }
    // ${this.buildFilter()}il placer en  haut line 15
    /**
     *construit un SVG contenant nos différents Cercles
     * @param {number} w Largeur du SVG
     * @param {number} n Nombre de Cercles
     * @param {number} r Rayon de chaque Cercle
     */
    buildCircles (w, n, r){
let dom = `<svg class="circles" width="${w}" height="${w}" viewBox="0 0 ${w} ${w}">`
        for(let i=0; i<n; i++)
        {
            const radius =(w/2 -r)
            const a =i* (Math.PI * 2)/n
            const x=  radius * Math.sin(a)+ w/2
            const y= radius * Math.cos(a)+ w/2
            dom+= ` <circle cx="${x}" cy="${y}" r="${r}" fill="currentColor"/>`
        }

return dom + '</svg>'
}

    /**
     *construit la trainée du loader
     * @param {nomber} r rayon du Cercle
     * @param {number} stroke Epaisseur du trait
     */
buildTrail (r, stroke){
    const w = r * 2 + stroke
        let dom = `<svg class="trail" width="${w}" height="${w}" viewBox="0 0 ${w} ${w}" fill="none">`
        dom+= ` <circle 
        cx="${w/2}"
        cy="${w /2}"
        r="${r}" 
        stroke="currentColor" 
        stroke-width="${stroke}"
         stroke-linecap="round"
         />`
        return dom + '</svg>'


    }
    /**
     * Construit le style de notre loader
     * @param {number} w Largeur de l'élément
     * @param {number} stroke Largeur de trait
     * @param {number} n nombre de sections
     * @return{string}
     */

    buildStyle(w, stroke, n) {
        const perimeter = Math.PI * (w - stroke)
        return `<style>
 :host {
        display: inline-block;
      }
                    div {
               
            /*    filter: url(#goo);*/
                  width: ${w}px;
                    height: ${w}px;
                    position: relative;
                     }
                     svg{
                     position: absolute;
                     top: 0;
                     left: 0;          
                     }
                     .circles{
                    
                      animation: spin 16s linear infinite;
                     }
                     @keyframes spin {
                     from {transform: rotate(0deg)}
                     to {transform: rotate(360deg)}
                     
                     }
                     .trail{
                     stroke-dasharray: ${perimeter};
                     stroke-dashoffset: ${perimeter + perimeter / n};
                     animation: spin2 1.6s cubic-bezier(.5, .15, .5, .85) infinite;
                     }
                     .trail circle {
                     animation: trail 1.6s cubic-bezier(0.5, .15, .5, .85) infinite;
                     }
                         @keyframes spin2 {
                     from {transform: rotate(0deg)}
                     to {transform: rotate(720deg)}
                     
                     }
                     @keyframes  trail{
                     0% {
                     stroke-dashoffset: ${perimeter + perimeter / n};
                     }                     
                     50% {
                     stroke-dashoffset: ${perimeter + 2.5 * perimeter / n};
                     }                     
                     100% {
                     stroke-dashoffset: ${perimeter + perimeter / n};
                     }                     
                     }
                </style>
`
    }

    /**
     *
     * @param {string} value
     * @param {number} initial
     * @param {number} threshold
     * @param {number} value
     */
    intFromPx(value, initial, threshold = 0){
        if (value==undefined || value==null){
            return initial;
        }
        let int = parseInt(value.replace('px'), 10)
        if (int <= threshold){
            return initial;}
return int;
    }
  /*  buildFilter(){
        return `<svg xmlns="http://www.w3.org/2000/svg" version="1.1">
<defs>
<filter id="goo">
<feGaussianBlur in="SourceGraphic" stdDeviation="10"
result="blur" />
<feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0
0 0  0 0 1 0 0 0 0 0 18 -7" result="goo" />
<feBlend in="SourceGraphic" in2="goo"/>
</filter>
</defs>
</svg>`
    }*/
}

try {
    customElements.define('spinning-dots', SpinningDots)
} catch (e) {
    if (e instanceof DOMException) {
        console.error('DOMException : ' + e.message)
    } else {
        throw e
    }
}
export default customElements

