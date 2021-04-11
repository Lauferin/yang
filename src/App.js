import React, { useState } from 'react';
import './App.css';
import CreateTable from './components/create-table/create-table.component';
import YangTable from './components/yang-table/yang-table.component';
import InsertValue from './components/insert-value/insert-value.component';

function App() {


	const [yang, updateYang] = useState([]);
	const [yangSize, updateYangSize] = useState();
	const [yangMissing, updateYangMissing] = useState(0);
	const MAXIMUM = 100;
	const MISSING = MAXIMUM + 1; //infinite (missing)

	const randomizeBoolean = (miss,infinites) => {
		if (Math.floor(Math.random() * (miss-infinites)) === 0)
			return true;
		return false;			
	}

	const create = (size, missing) => {
		if (size>10)
			size = 10;
		const yangTable = [];
		for(var ii=0; ii<size; ii++) {
			yangTable[ii] = [];
			for(var jj=0; jj<size; jj++) {
				yangTable[ii][jj] = undefined;
			}
		}
		let willBeMissing;
		let cannotBeMissing;
		let number;
		let quantFinite = 0;
		let quantInfinite = 0;
		let m = size;
		let n = size;
		let i = 0;
		let j;
		let minNumber = 1;
		while (i < m) {
			j = 0;
			while (j < n) {
				//first we check if the square is supposed to be infinite:
				willBeMissing = false;
				if (quantFinite === size*size-missing) {
					willBeMissing = true;
				}
				if (willBeMissing === false) {
					//we check is the square is allowed to have infinite:
					cannotBeMissing = false;
					if ((m-i)*(n-j) > missing-quantInfinite) {
						cannotBeMissing = true; //can't be infinite
					}
					//if the square is allowed to be infinite, we randomize whether it will be or not:
					if (cannotBeMissing === false) {
						willBeMissing = randomizeBoolean(missing,quantInfinite);
					}
					//if it's not infinite, we randomize the number:
					if (willBeMissing === false) {
						if (i>0 && j>0) {
							minNumber = Math.max(yangTable[i-1][j], yangTable[i][j-1]);
						}
						else if(i>0) {
							minNumber = yangTable[i-1][j];
						}
						else if(j>0) {
							minNumber = yangTable[i][j-1];
						}
						//the part of *(i+1)*(j+1) / (size*size) was added in order to make the numbers more friendly
						number = Math.floor(Math.random() * (MAXIMUM-minNumber) * (i+1)*(j+1) / (size*size)) + minNumber;
						yangTable[i][j] = number;
						quantFinite++;
					}
				}
				if (willBeMissing === true) { //don't change it to else because the variable could also change in the if statement.
					//we fill it and all the below and right with infinites
					for (let k=i; k<m; k++) {
						for (let l=j; l<n; l++) {
							yangTable[k][l] = MISSING;
							quantInfinite++;
						}
					}
					//we reduce the table (we discard all the right part)
					n = j; //right part discarded
				}
				j++;
			}
			i++;
		}

		console.log(yangTable);

		updateYangSize([size]);
		(parseInt(missing) > -1) ? updateYangMissing([missing]) : updateYangMissing([0]);
		console.log(missing)
		updateYang([yangTable]);	
		
	}

	const insert = (greatYangTable,insertValue,missing) => {
		const yangTable = greatYangTable[0];
		let i = yangSize-1;
		let j = yangSize-1;
		let k;
		let l;
		yangTable[i][j] = insertValue;
		let allowed = false;
		while (allowed===false) {
			if (i!==0 && j!==0) {
				if (yangTable[i-1][j] > yangTable[i][j-1]) {
					k = i-1;
					l = j;
				}
				else {
					k = i;
					l = j-1;
				}
				if (yangTable[k][l] > yangTable[i][j]) {
					yangTable[i][j] = yangTable[k][l];
					yangTable[k][l] = insertValue;
				}
				else {
					allowed = true;
				}
			}
			else if (i!==0) {
				if (yangTable[i-1][j] > yangTable[i][j]) {
					yangTable[i][j] = yangTable[i-1][j];
					yangTable[i-1][j] = insertValue;
					k = i-1; //necessary for below
					l = j;
				}
				else {
					allowed = true;
				}
			}
			else if (j!==0) {
				if (yangTable[i][j-1] > yangTable[i][j]) {
					yangTable[i][j] = yangTable[i][j-1];
					yangTable[i][j-1] = insertValue;
					k = i; //necessary for below
					l = j-1;
				}
				else {
					allowed = true;
				}
			}
			else {
				allowed = true;
			}
			if (k === i-1)
				i--;
			if (l === j-1)
				j--;
			
			updateYangMissing(missing-1);
			updateYang([yangTable]);

		}
	}

    //useEffect(() => {
        //lo recorro si bien me devuelve uno solo (porque quizas no me devuelve ninguno, era mucho lio usar solo filter)
        //const selected = sections.filter((section) => location.pathname.search(section.title.replace(/ /g,"-")) !== -1) 
        //if (selected.length>0) {
        //    setCurrentPost(selected[0].id);
        //} else {
        //    setCurrentPost(-1);
        //}
    //},[yang]);
	

	return (
		<div className="App">
			<header>
				<h1>Yang Table</h1>
			</header>
			<main>
				<div className="instructions">
					<CreateTable onCreate={create} className="instructions-create"/>
					<YangTable size={yangSize} yang={yang} missingValue={MISSING} />
					<InsertValue onInsert={insert} size={yangSize} yang={yang} missing={yangMissing} className="instructions-insert" />
				</div>
				<div className="aclarations">
					The create method has a running time of O(n), but the insert method has a running time of O(lgn)!
					although at the end of the day react udpates the state and creates the array from scratch but that's another issue :-)
				</div>
			</main>
			<footer>
				Adrian Laufer
			</footer>
		</div>
	);
}

export default App;
