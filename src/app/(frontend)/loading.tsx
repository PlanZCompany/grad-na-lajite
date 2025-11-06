import GlobalLoader from '@/components/Loader/GlobalLoader'
import { COLORS } from '@/cssVariables'

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[20] bg-purpleBackground">
      <GlobalLoader color={COLORS.primaryYellow} />
    </div>
  )
}
