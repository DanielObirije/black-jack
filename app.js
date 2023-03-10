const BLACKJACK = {
	'YOU': {'span':".your-black-jack-results",'div':'.your-box ','score': 0}, 
	'DEALER': {'span':'.dealer-black-jack-results','div':'.dealer-box','score': 0},
	"cards":['2','3','4','5','6','7','8','9','10','K','j','Q',"A"],
	'cardMap':{'2': 2,'3': 3,'4': 4,'5': 5,'6': 6,'7': 7,'8': 8,
	'9': 9,'10': 10,'K': 10,'j': 10,'Q': 10,"A":[1,11]},
	'wins': 0,
	'draws': 0,
	'loses': 0,
	'isStand': false,
	'isFinished': false,

}

document.querySelector('.hit').addEventListener('click',HITfunction)
 document.querySelector('.stand').addEventListener('click',STANDfunction)
document.querySelector('.deal').addEventListener('click',DEALfunction)

let You = BLACKJACK['YOU']
let Dealer = BLACKJACK['DEALER']
const hitsounds = new Audio('blackjackAssets/sounds/swish.m4a')
const cashsounds = new Audio('blackjackAssets/sounds/cash.mp3')
const awwsounds = new Audio('blackjackAssets/sounds/aww.mp3')



function HITfunction() {
	if (BLACKJACK['isStand'] === false) {
		const card = random()
	    creatIMG(You,card)
	    updatescore(You,card)
	    showscore(You)
	    console.log(You['score'])
	}
	
}



function creatIMG (assets,random) {
	if(assets['score'] <= 21){
       const img = document.createElement('img')
	img.src = `blackjackAssets/images/${random}.png`
	document.querySelector(assets ['div']).appendChild(img)
	console.log(img)
	hitsounds.play()

	}
	
}

function random() {
	const randomindex = Math.round(Math.random()*12)
	return BLACKJACK['cards'][randomindex]


}

function DEALfunction() {
if (BLACKJACK['isFinished'] === true) {

    BLACKJACK['isStand'] = false
			
	let yourimage = document.querySelector(You['div']).querySelectorAll('img')
	 	yourimage.forEach(function (e) {
	 		e.remove()
	 	})
	 let Dealerimge = document.querySelector(Dealer['div']).querySelectorAll('img')
	 Dealerimge.forEach(function (e) {
	 	 e.remove()
	 })
	  
	  const you = document.querySelector(You['span']).textContent = 0
	  const danny = You['score'] = 0
	  const deal = document.querySelector(Dealer['span']).textContent = 0
	  const daa = Dealer['score'] = 0

	  document.querySelector(You['span']).style.color =  'white'
	  document.querySelector(Dealer['span']).style.color =  'white'
	  document.querySelector('.blackjackresults').textContent = 'lets play'
	   document.querySelector('.blackjackresults').style.color = 'black'
	   BLACKJACK['isFinished'] = false

   }
}

function updatescore(activeplayer,card) {
	if (card === 'A') {
		if ( activeplayer['score'] + BLACKJACK['cardMap'][card][1] <= 21) {
             activeplayer['score'] += BLACKJACK['cardMap'][card][1]
		}else{
			activeplayer['score'] += BLACKJACK['cardMap'][card][0]
		}
      
	} else{
		activeplayer['score'] += BLACKJACK['cardMap'][card]
	}
  
 
}

function showscore (activeplayer) {
	if (activeplayer['score'] > 21) {
		document.querySelector(activeplayer['span']).textContent =  'BUST'
		document.querySelector(activeplayer['span']).style.color =  'red'
	} else{
		document.querySelector(activeplayer['span']).textContent =  activeplayer['score']
	}
	
}

function sleep(ms) {

   return new Promise(resolve => setTimeout(resolve,ms))
}

async function STANDfunction() {
	BLACKJACK['isStand'] = true
	while(Dealer['score'] < 16 && BLACKJACK['isStand'] === true){	
	    const card = random()
		creatIMG(Dealer,card)
		updatescore(Dealer,card)
		showscore(Dealer)
        await sleep(1000 )
   }
	
		BLACKJACK['isFinished'] = true
		let winnner = Desidewinner()
        showResult(winnner)


}

function Desidewinner() {
	let winnner ;
	if (You['score'] <= 21) {
		if (You['score'] > Dealer['score'] || Dealer['score'] > 21 ) {
			BLACKJACK['wins']++
			winnner = You
		} else if (You['score'] < Dealer['score']) {
			BLACKJACK['loses']++
			winnner = Dealer
		} else if (You['score'] === Dealer['score']) {
			BLACKJACK['draws']++
		}
	} else if(You['score'] > 21 && Dealer['score'] <= 21){
            console.log('dealer won')
            winnner = Dealer
	} else if (You['score'] > 21  && Dealer['score'] > 21) {
		console.log('draw')
	}
	console.log('winner is', winnner)
	return winnner
}

function showResult(winnner) {
	if (BLACKJACK['isFinished'] === true) {
		 let message ;
	let color;
	  if (winnner === You) {
	  	document.querySelector('.wins').textContent = BLACKJACK['wins']
	  	message = 'you won'
	  	color = 'green'
        cashsounds.play()
	  } else if (winnner === Dealer) {
	  	document.querySelector('.loses').textContent = BLACKJACK['loses']
           	message = 'you lost'
	  	   color = 'red'
           awwsounds.play()
	  }  else{
	  	document.querySelector('.draws').textContent = BLACKJACK['draws']
	  	 	message = 'you draw'
	  	    color = 'black'
           
	  }
   document.querySelector('.blackjackresults').textContent = message
   document.querySelector('.blackjackresults').style.color = color

	}
	
}