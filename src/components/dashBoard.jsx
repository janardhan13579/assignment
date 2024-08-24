import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addWidget, removeWidget } from '../widgets/slice';

const DashBoard = () => {
    const widgets = useSelector((state) => state.widgets);
    const dispatch = useDispatch();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [newWidget, setNewWidget] = useState({ name: '', content: '' });
    const [searchTerm, setSearchTerm] = useState(''); // New state for search term

    const handleAddWidget = () => {
        if (selectedCategory && newWidget.name && newWidget.content) {
            const newId = Date.now();
            dispatch(
                addWidget({
                    categoryId: selectedCategory,
                    widget: { id: newId, name: newWidget.name, content: newWidget.content },
                })
            );
            setNewWidget({ name: '', content: '' });
            setIsSidebarOpen(false);
        }
    };

    const handleRemoveWidget = (categoryId, widgetId) => {
        dispatch(removeWidget({ categoryId, widgetId }));
    };

    const openSidebar = () => {
        setIsSidebarOpen(true);
    };

    const closeSidebar = () => {
        setIsSidebarOpen(false);
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value.toLowerCase());
    };

    const filteredWidgets = widgets.map((category) => ({
        ...category,
        widgets: category.widgets.filter(
            (widget) =>
                widget.name.toLowerCase().includes(searchTerm) ||
                widget.content.toLowerCase().includes(searchTerm)
        ),
    }));

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="flex justify-between items-center ">
                <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
                <input
                    type="text"
                    placeholder="Search widgets..."
                    className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
                <button
                    onClick={openSidebar}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                >
                    + Add Widget
                </button>

            </div>
            {filteredWidgets.map((category) => (
                <div key={category.id} className="mb-10">
                    <h2 className="text-2xl font-semibold mb-4">{category.category}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {category.widgets.map((widget) => (
                            <div key={widget.id} className="bg-white shadow-md rounded-lg p-6 relative">
                                <h3 className="text-xl font-semibold mb-2">{widget.name}</h3>
                                <p className="text-gray-600">{widget.content}</p>
                                <button
                                    onClick={() => handleRemoveWidget(category.id, widget.id)}
                                    className="absolute top-2 right-2 text-gray-400 hover:text-red-600"
                                >
                                    &times;
                                </button>
                            </div>
                        ))}
                        <div className="bg-white shadow-md rounded-lg p-6 flex items-center justify-center">
                            <button
                                onClick={openSidebar}
                                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                            >
                                + Add Widget
                            </button>
                        </div>
                    </div>
                </div>
            ))}
            <div
                className={`fixed top-0 right-0 w-1/3 h-full bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'
                    }`}
            >
                <div className="flex justify-between items-center p-6 border-b border-gray-200">
                    <h2 className="text-2xl font-semibold">Add New Widget</h2>
                    <button onClick={closeSidebar} className="text-gray-600 hover:text-red-600">
                        &times;
                    </button>
                </div>
                <div className="p-6">
                    <input
                        type="text"
                        placeholder="Widget Name"
                        className="w-full mb-4 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={newWidget.name}
                        onChange={(e) => setNewWidget({ ...newWidget, name: e.target.value })}
                    />
                    <textarea
                        placeholder="Widget Content"
                        className="w-full mb-4 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={newWidget.content}
                        onChange={(e) => setNewWidget({ ...newWidget, content: e.target.value })}
                    />
                    <div>
                        <h3 className="text-xl font-semibold mb-2">Choose Category</h3>
                        {widgets.map((category) => (
                            <div key={category.id} className="mb-4">
                                <label className="inline-flex items-center">
                                    <input
                                        type="radio"
                                        name="category"
                                        className="form-radio h-4 w-4 text-blue-600"
                                        onChange={() => setSelectedCategory(category.id)}
                                    />
                                    <span className="ml-2">{category.category}</span>
                                </label>
                            </div>
                        ))}
                    </div>
                    <button
                        onClick={handleAddWidget}
                        className="mt-6 w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                    >
                        Add Widget
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DashBoard;
