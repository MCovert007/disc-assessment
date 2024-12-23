import QueryContent from "@/components/DISC/query/QueryContent";

export default function Query() {
  return (
    <main className="min-h-screen" 
      style={{
        background:"url('/images/disc-home/2-5.jpg')", 
        backgroundRepeat:'no-repeat', 
        backgroundSize:'cover', 
        backgroundPosition:"50% 50%"
      }}
    >
      <div className="absolute top-0 left-0 w-full h-full" style={{ backdropFilter:"saturate(120%) blur(8px)", }}>
        <div className="relative w-full min-h-screen h-full" style={{backgroundColor:"rgba(200, 200, 200, .3)"}}>
          <QueryContent/>
        </div>
      </div>
    </main>
  );
}