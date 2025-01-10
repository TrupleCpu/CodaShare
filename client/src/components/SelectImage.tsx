
import C from '../assets/C.png'
import Cpp from '../assets/C++.png'
import Java from '../assets/Java.png'
import Javascript from '../assets/Javascript.png'
import Python from '../assets/Python.png'
import Typescript from '../assets/Typescript.png'
import All from '../assets/Source.png'

export const selectImage = (Language: any) => {
    switch(Language){
      case "C":
        return <img src={C} alt={Language}/>;
      case "Typescript":
        return <img src={Typescript} alt={Language} />;
      case "Java":
        return <img src={Java} alt={Language} />;
      case "Python":
        return <img src={Python} alt={Language} />;
      case "Javascript":
        return <img src={Javascript} alt={Language}  />;
      case "C++":
        return <img src={Cpp} alt={Language} />;
      case "All":
        return <img src={All} alt={Language} />
      default:
        return null;
    }
 }

 