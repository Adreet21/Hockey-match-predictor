// LoadingScreen.jsx
const LoadingScreen = ( {message} ) => {
  return (
    <div className="loading-screen">
      <div className="spinner"></div>
      <p>&nbsp;&nbsp;{message}</p>
    </div>
  );
};

export default LoadingScreen;
