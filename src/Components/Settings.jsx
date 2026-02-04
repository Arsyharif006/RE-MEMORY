const Settings = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black z-20 flex flex-col items-center justify-center">
      <div className="text-center max-w-md">
        <h2 className="text-3xl lg:text-4xl font-serif text-gray-300 mb-12 tracking-wider">Pengaturan</h2>
        
        <div className="space-y-8 mb-12">
          <div className="text-left">
            <p className="text-gray-400 text-lg mb-3">Volume</p>
            <input type="range" min="0" max="100" defaultValue="70" className="w-full" />
          </div>
          
          <div className="text-left">
            <p className="text-gray-400 text-lg mb-3">Brightness</p>
            <input type="range" min="0" max="100" defaultValue="100" className="w-full" />
          </div>
        </div>

        <button
          onClick={onClose}
          className="text-gray-300 hover:text-white px-8 py-3 border border-gray-600 hover:border-gray-400 transition-colors duration-300 text-lg"
        >
          Kembali
        </button>
      </div>
    </div>
  );
};

export default Settings;
