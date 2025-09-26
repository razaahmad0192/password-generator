import { useState, useEffect, useCallback, useRef } from "react"

const App = () => {

  const [length, setLength] = useState(8)
  const [numAllowed, setnumAllowed] = useState(false)
  const [charAllowed, setcharAllowed] = useState(false)
  const [password, setpassword] = useState("")


  const passRef = useRef(null)


  const passGenerator = useCallback(() => {
    let pass = "";
    let str = "qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM";
    if (numAllowed) str += "012345678901234567890123456789";
    if (charAllowed) str += "`~!@#$`~!@#$%^&*()_+}][{`[{`";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length)
      pass += str.charAt(char)

    }
    setpassword(pass)

  }
    , [length, numAllowed, charAllowed, setpassword])


  useEffect(() => {

    passGenerator()

  }, [length, numAllowed, charAllowed, passGenerator])

  const copyPassToClip = useCallback(
    () => {
      passRef.current?.select()
      window.navigator.clipboard.writeText(password)
    },
    [password]
  )



  return (
    <>
      <section className="border h-screen w-screen flex justify-center items-center bg-black ">
        <div className="dabba flex flex-col gap-5">
        
        <h1 className="text-4xl sm:text-5xl text-center font-bold bg-clip-text text-transparent   bg-gradient-to-r from-orange-500 via-red-400 to-blue-600">Password Generator</h1>

        <div className="h-72 w-[80vw] sm:w-full max-w-md mx-auto  shadow-md rounded-lg px-4 text-orange-500 bg-gray-700 border flex flex-col gap-5 justify-center items-center">


          <div className="inputBox shadow-md rounded-lg overflow-hidden flex mb-4 text-xl sm:text-2xl bg-gray-400 text-black font-medium">
            <input type="text" value={password} className="outline-none w-full py-1 px-3 " placeholder="password" readOnly ref={passRef} />
            <button className="copy outline-none bg-blue-700 text-white px-3 py-2 shrink-0 hover:bg-blue-900 cursor-pointer" onClick={copyPassToClip}>Copy</button>
          </div>


          <div className="flex flex-col text-lg sm:text-xl gap-y-2">

            <div className="flex flex-col justify-center gap-y-1">

              <input type="range" min={6} max={15} value={length} className="cursor-pointer" onChange={(e) => {
                setLength(e.target.value)
              }} />
            
              <label>Length:{length}</label>
            </div>

            <div className="flex items-center gap-x-1">

              <input type="checkbox" defaultChecked={numAllowed} id="numberInput" className="cursor-pointer" onChange={() => {
                setnumAllowed(!numAllowed)
              }} />
              <label>Numbers</label>
            </div>

            <div className="flex items-center gap-x-1">

              <input type="checkbox" defaultChecked={charAllowed} id="numberInput" className="cursor-pointer" onChange={() => {
                setcharAllowed(!charAllowed)
              }} />
              <label>Characters</label>
            </div>

          </div>

        </div>
          
        </div>
      </section>
    </>
  )
}

export default App
