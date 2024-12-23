export default function getProfile(data: number[]) {

    const scores : any = { D: data[0], I:data[1], S:data[2], C:data[3] }
    const sortedTraits = Object.keys(scores).sort((a, b) => scores[b] - scores[a]);
    data.sort((a, b) => a - b);
    const average = (data[0]+data[1]+data[2]+data[3])/4
    const average2 = Math.floor(Math.sqrt(Math.pow((average-data[0]), 2)+Math.pow((average-data[1]), 2)+Math.pow((average-data[2]), 2)+Math.pow((average-data[3]), 2)))
    let profile = ""
    if(average2<4){
      profile = sortedTraits[0]+sortedTraits[1]+sortedTraits[2]+sortedTraits[3]
    }else{
      sortedTraits.map((item:string)=>{
        if(scores[item]>=average)
          profile+=item
      })
    }
    return profile
}