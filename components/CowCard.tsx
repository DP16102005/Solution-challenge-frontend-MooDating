import Image from "next/image"
import { Card, CardContent } from "@mui/material"

export default function CowCard({ cow }) {
  return (
    <Card>
      <CardContent>
        <Image
          src={cow.imageUrl || "/placeholder.svg"}
          alt={cow.name}
          width={300}
          height={200}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="rounded-md object-cover"
        />
        {/* ... (rest of the card content) */}
      </CardContent>
    </Card>
  )
}

