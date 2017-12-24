import React from 'react'

export default () => (
	<div className="wrap">
        <h2>Simply todo List</h2>
        <ul className="menu">
          <li>
            <a href="#">Todo</a>
          </li>
          <li>
            <a href="#">Incomplete</a>
          </li>
        </ul>
        <form>
          <input type="text" />
        </form>
        <ul className="items">
          <li>Get Milk <span>x</span></li>
        </ul>
      </div>
	)