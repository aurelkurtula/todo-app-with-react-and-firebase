import React from 'react'
const ItemsComponent=({items, done, action, addItem, inputRef, authenticated})=> {
			let lis = []
			let mark = done === false ? '\u2713' : 'x';
      for(let i in items){
        if(items[i].completed === done){
          lis.push(<li key={i}>{items[i].item} 
          	<span onClick={ ()=> action(i) }>{mark}</span></li>)
        }
      }
    if(!authenticated){ return null }
    return (
      <div>

        {done
          ? (<ul className="items"> {lis} </ul>)
          : (
          	<div>
	            <form  onSubmit={addItem}>
				 				<input ref={inputRef} type="text" /> 
				 			</form>
				 			<ul className="items"> {lis} </ul>
			 			</div>
          )
        }
      </div>
    );				     
}
export default ItemsComponent;

