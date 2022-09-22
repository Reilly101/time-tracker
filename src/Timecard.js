export default function Timecard ({level, setLevel}) {


    return (

<div> 
    <div className= 'topcontainer'>
    <img src= 'Bitmap-3.png'/>
    <div className = 'reportcard'> 
    <div className = 'title'>Report for </div>
    <div className = 'name'>Jeremy</div>
    </div>
    </div>
    <div className = 'bottomcontainer'>
        <div className = 'filter'>
            <div className = {`level ${level==='Day'?'active':''}`} onClick={()=>setLevel('Day')}>Daily</div>
            <div className = {`level ${level==='Week'?'active':''}`} onClick={()=>setLevel('Week')}>Weekly</div>
            <div className ={`level ${level==='Month'?'active':''}`} onClick={()=>setLevel('Month')}>Monthly</div>
        </div>
    </div>
</div>
    )
}