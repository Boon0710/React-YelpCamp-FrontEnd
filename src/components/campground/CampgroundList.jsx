import {useCampgrounds} from "./useCampgrounds";
import CampgroundCard from "./CampgroundCard"
import { useSearchParams } from "react-router-dom";
function CampgroundList() {
    const [searchParams] = useSearchParams();
    const searchQuery = searchParams.get("search") || "";
    const {isPending, campgrounds} = useCampgrounds({search: searchQuery});
    console.log(campgrounds)
    if(isPending) return <div>Loading...</div>
    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 px-4 md:px-8 lg:px-16">
            {campgrounds.map(campground => <CampgroundCard key={campground._id} campground={campground}/>)}
        </div>
    )
}

export default CampgroundList
