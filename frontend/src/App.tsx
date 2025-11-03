import TextType from "./component/animation/typing_animation"
import Background from "./component/background/background"
// @ts-ignore - SentimentAnalyzer is a JS module without TypeScript declarations
import SentimentAnalyzer from "./component/SentimentAnalyzer";

function App() {
  return (
    <>
      <div className="flex flex-col items-center justify-center w-full h-screen absolute z-10 gap-6">
        <TextType 
        text={"Desktop Companion"} 
        typingSpeed={75} 
        pauseDuration={1500} 
        showCursor={true}
        cursorCharacter="|" 
        className="text-4xl font-bold text-white"/>
      
        <SentimentAnalyzer /> 
      </div>
      <Background />
    </>
  )
}

export default App
