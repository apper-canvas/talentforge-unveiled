import { motion } from 'framer-motion'

const Loading = ({ type = 'grid', count = 6 }) => {
  const shimmer = {
    animate: {
      backgroundPosition: ['200% 0', '-200% 0'],
    },
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'linear',
    }
  }

  const ShimmerBox = ({ className }) => (
    <motion.div
      className={`bg-gradient-to-r from-surface via-slate-600 to-surface bg-[length:200%_100%] rounded-xl ${className}`}
      animate={shimmer.animate}
      transition={shimmer.transition}
      style={{
        backgroundImage: 'linear-gradient(90deg, #1E293B 25%, #475569 50%, #1E293B 75%)',
        backgroundSize: '200% 100%',
      }}
    />
  )

  if (type === 'grid') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {Array.from({ length: count }).map((_, index) => (
          <div key={index} className="glass rounded-2xl p-6 space-y-4">
            <ShimmerBox className="w-16 h-16 rounded-full" />
            <div className="space-y-3">
              <ShimmerBox className="h-6 w-3/4" />
              <ShimmerBox className="h-4 w-1/2" />
              <div className="flex gap-2">
                <ShimmerBox className="h-6 w-16 rounded-full" />
                <ShimmerBox className="h-6 w-20 rounded-full" />
                <ShimmerBox className="h-6 w-14 rounded-full" />
              </div>
            </div>
            <ShimmerBox className="h-10 w-full rounded-lg" />
          </div>
        ))}
      </div>
    )
  }

  if (type === 'detail') {
    return (
      <div className="space-y-8">
        {/* Hero Section */}
        <div className="glass rounded-3xl p-8 space-y-6">
          <div className="flex items-center gap-6">
            <ShimmerBox className="w-24 h-24 rounded-full" />
            <div className="space-y-3 flex-1">
              <ShimmerBox className="h-8 w-1/3" />
              <ShimmerBox className="h-5 w-1/4" />
              <div className="flex gap-2">
                <ShimmerBox className="h-6 w-16 rounded-full" />
                <ShimmerBox className="h-6 w-20 rounded-full" />
                <ShimmerBox className="h-6 w-18 rounded-full" />
              </div>
            </div>
          </div>
          <ShimmerBox className="h-20 w-full" />
        </div>

        {/* Projects Section */}
        <div className="space-y-6">
          <ShimmerBox className="h-8 w-48" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="glass rounded-xl p-4 space-y-4">
                <ShimmerBox className="h-48 w-full rounded-lg" />
                <ShimmerBox className="h-6 w-3/4" />
                <ShimmerBox className="h-16 w-full" />
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex items-center justify-center py-12">
      <motion.div
        className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
      />
    </div>
  )
}

export default Loading