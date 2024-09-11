function Food(){
    //outside of the return statement, you don't need curly braces to write js
    const food1 = "Apple";
    const food2 = "Banana"; 
    return(<ul>
        <li>
            {food1}
        </li>
        <li>
            {food2}
        </li>
    </ul>);
}
export default Food