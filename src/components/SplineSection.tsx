const SplineSection = () => {
  return (
    <section className="relative w-full h-screen bg-background overflow-hidden">
      <div className="absolute inset-0">
        {/* @ts-ignore */}
        <spline-viewer 
          url="https://prod.spline.design/1kASWGJRFtI3K7YI/scene.splinecode"
          style={{ width: '100%', height: '100%' }}
        />
      </div>
      
      {/* Optional overlay content */}
      <div className="relative z-10 flex items-center justify-center h-full">
        <div className="text-center px-6">
          <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            Innovation & Design
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Une vision architecturale moderne pour vos projets d'exception
          </p>
        </div>
      </div>
    </section>
  );
};

export default SplineSection;
