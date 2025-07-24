import React, { useState, useRef } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { 
  MapPin, Calendar, Trash2, GripVertical, 
  ChevronDown, ChevronUp, Clock, AlertTriangle,
  Info, Sun, Sunset, Coffee, Utensils, Printer,
  Mail, Check
} from 'lucide-react';
import { useReactToPrint } from 'react-to-print';
import useItineraryStore from './ItineraryService';


const CustomAlert = ({ variant = 'info', icon: Icon, title, children }) => {
  const styles = {
    info: 'bg-blue-50 border-blue-200 text-blue-800',
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
    error: 'bg-red-50 border-red-200 text-red-800',
    success: 'bg-green-50 border-green-200 text-green-800'
  };

  return (
    <div className={`p-4 rounded-lg border ${styles[variant]} flex items-start`}>
      {Icon && <Icon className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0" />}
      <div>
        {title && <h4 className="font-semibold mb-1">{title}</h4>}
        <div className="text-sm">{children}</div>
      </div>
    </div>
  );
};

// Previous components remain the same: TimeSlotPicker, DailyGuide, ItineraryItem, DaySection
const TimeSlotPicker = ({ value, onChange, duration }) => {
  return (
    <div className="flex items-center space-x-2">
      <select 
        value={value} 
        onChange={(e) => onChange(e.target.value)}
        className="text-sm border rounded-md px-3 py-1.5 text-gray-700 bg-white hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
      >
        {Array.from({ length: 24 }).map((_, hour) => (
          <option key={hour} value={`${hour.toString().padStart(2, '0')}:00`}>
            {`${hour.toString().padStart(2, '0')}:00`}
          </option>
        ))}
      </select>
      <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-md">
        {duration} hrs
      </span>
    </div>
  );
};

const DailyGuide = ({ dayNumber, totalTime, startTime, endTime }) => {
  const timeLeft = 8 - totalTime;
  const isOverScheduled = totalTime > 12;

  return (
    <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-6 mb-4 border border-gray-200 shadow-sm">
      <h4 className="font-semibold text-lg mb-4 text-gray-800 flex items-center">
        <Sun className="w-5 h-5 mr-2 text-yellow-500" />
        Day {dayNumber} Overview
      </h4>
      
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg border border-gray-100">
            <div className="flex items-center text-sm font-medium text-gray-700">
              <Clock className="w-4 h-4 mr-2 text-blue-500" />
              Schedule
            </div>
            <div className="mt-2 text-sm text-gray-600">
              {startTime} - {endTime}
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg border border-gray-100">
            <div className="flex items-center text-sm font-medium text-gray-700">
              <Coffee className="w-4 h-4 mr-2 text-orange-500" />
              Suggested Breaks
            </div>
            <div className="mt-2 text-sm text-gray-600">
              {Math.floor(totalTime / 3)} breaks recommended
            </div>
          </div>
        </div>

        {isOverScheduled ? (
          <CustomAlert 
            variant="error" 
            icon={AlertTriangle}
            title="Schedule Alert"
          >
            Consider spreading activities across multiple days to avoid rushing through attractions.
          </CustomAlert>
        ) : timeLeft > 0 ? (
          <CustomAlert 
            variant="info" 
            icon={Info}
            title="Time Available"
          >
            You have approximately {timeLeft} hours available for additional activities.
          </CustomAlert>
        ) : null}

        <div className="bg-white rounded-lg p-4 border border-gray-100">
          <h5 className="font-medium text-sm mb-3 text-gray-700">Daily Tips</h5>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center text-sm text-gray-600">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                Start early to avoid crowds
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                Pack water and snacks
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center text-sm text-gray-600">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                Book restaurants in advance
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                Check weather forecast
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ItineraryItem = ({ item, index, onRemove, isExpanded, onToggleExpand, onUpdateTime }) => {
  return (
    <Draggable draggableId={item._id} index={index}>
      {(provided) => (
        <li
          ref={provided.innerRef}
          {...provided.draggableProps}
          className="bg-white rounded-xl shadow-sm mb-3 overflow-hidden border border-gray-200 hover:border-blue-200 transition-colors"
        >
          <div className="flex items-center p-4">
            <div {...provided.dragHandleProps} className="mr-3 text-gray-400 hover:text-gray-600 cursor-grab">
              <GripVertical className="w-5 h-5" />
            </div>

            <div className="flex-grow">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-800">{item.placeName}</h3>
                <div className="flex items-center space-x-3">
                  <TimeSlotPicker
                    // value={item.startTime || '07:00'}
                    onChange={(time) => onUpdateTime(item._id, time)}
                    duration={item.duration || 2}
                  />
                  <button
                    onClick={() => onToggleExpand(item._id)}
                    className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    {isExpanded ? 
                      <ChevronUp className="w-5 h-5 text-gray-600" /> : 
                      <ChevronDown className="w-5 h-5 text-gray-600" />
                    }
                  </button>
                  <button
                    onClick={() => onRemove(item._id)}
                    className="p-1.5 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-5 h-5 text-red-500" />
                  </button>
                </div>
              </div>

              <div className="flex items-center text-sm text-gray-600 mt-2">
                <div className="flex items-center mr-4">
                  <MapPin className="w-4 h-4 mr-1 text-gray-400" />
                  <span>{item.location}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1 text-gray-400" />
                  <span>{item.bestSeasonToVisit}</span>
                </div>
              </div>
            </div>
          </div>

          {isExpanded && (
            <div className="px-4 pb-4 border-t border-gray-100">
              <div className="mt-4 bg-blue-50 rounded-lg p-4">
                <h4 className="font-medium text-sm mb-3 text-blue-800">Visit Tips</h4>
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-white rounded-lg p-3 border border-blue-100">
                    <div className="text-xs text-blue-500 mb-1">Best Time</div>
                    <div className="text-sm text-gray-700">{item.bestTimeOfDay || 'Morning'}</div>
                  </div>
                  <div className="bg-white rounded-lg p-3 border border-blue-100">
                    <div className="text-xs text-blue-500 mb-1">Duration</div>
                    <div className="text-sm text-gray-700">{item.duration || 2} hours</div>
                  </div>
                  <div className="bg-white rounded-lg p-3 border border-blue-100">
                    <div className="text-xs text-blue-500 mb-1">Booking</div>
                    <div className="text-sm text-gray-700">{item.requiresBooking ? 'Required' : 'Not Required'}</div>
                  </div>
                </div>
              </div>
              
              <p className="text-gray-700 text-sm mt-4">{item.text}</p>
              
              <div className="mt-4 text-xs text-gray-500 flex items-center">
                <Clock className="w-3 h-3 mr-1" />
                Added on: {new Date(item.addedAt).toLocaleDateString()}
              </div>
            </div>
          )}
        </li>
      )}
    </Draggable>
  );
};

const DaySection = ({ day, items, onRemoveItem, expandedItems, onToggleExpand, onUpdateTime }) => {
  const totalTime = items.reduce((acc, item) => acc + (item.duration || 2), 0);
  const startTime = items[0]?.startTime || '09:00';
  const endTime = items[items.length - 1]?.startTime || '17:00';

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-gray-800">Day {day}</h3>
        <div className="flex items-center space-x-2 bg-gray-100 px-4 py-2 rounded-full">
          <Sun className="w-5 h-5 text-yellow-500" />
          <span className="text-sm font-medium text-gray-600">
            {items.length} activities
          </span>
        </div>
      </div>

      <DailyGuide 
        dayNumber={day} 
        totalTime={totalTime} 
        startTime={startTime} 
        endTime={endTime}
      />

      <Droppable droppableId={`day-${day}`}>
        {(provided) => (
          <ul {...provided.droppableProps} ref={provided.innerRef} className="space-y-4">
            {items.map((item, index) => (
              <ItineraryItem
                key={item._id}
                item={item}
                index={index}
                onRemove={onRemoveItem}
                isExpanded={expandedItems.has(item._id)}
                onToggleExpand={onToggleExpand}
                onUpdateTime={onUpdateTime}
              />
            ))}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>

      <div className="mt-6 bg-gradient-to-r from-orange-50 to-orange-100 rounded-xl p-5 border border-orange-200">
        <div className="flex items-center text-orange-800 font-medium mb-3">
          <Utensils className="w-5 h-5 mr-2 text-orange-500" />
          <span>Dining Recommendations</span>
        </div>
        <div className="bg-white rounded-lg p-4 text-sm text-gray-600">
          Based on your schedule, we recommend planning lunch around{' '}
          {items.length > 0 ? items[Math.floor(items.length / 2)].location : 'nearby restaurants'}
        </div>
      </div>
    </div>
  );
};

const PrintableItinerary = React.forwardRef(({ itemsByDay }, ref) => (
  <div ref={ref} className="p-8">
    <h1 className="text-3xl font-bold text-center mb-8">Travel Itinerary</h1>
    {Object.entries(itemsByDay).map(([day, items]) => (
      <div key={day} className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Day {day}</h2>
        <div className="space-y-4">
          {items.map((item) => (
            <div key={item._id} className="border rounded-lg p-4">
              <h3 className="font-semibold">{item.placeName}</h3>
              <div className="text-sm text-gray-600 mt-2">
                <div>Location: {item.location}</div>
                <div>Time: {item.startTime} ({item.duration} hours)</div>
                <div>Best Season: {item.bestSeasonToVisit}</div>
              </div>
              <p className="text-sm mt-2">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    ))}
  </div>
));

const Itinerary = ({ userId }) => {
  const [expandedItems, setExpandedItems] = useState(new Set());
  const [bookingStatus, setBookingStatus] = useState({ show: false, success: false });
  const printRef = useRef();
  
  const { 
    getUserItinerary, 
    removeFromItinerary, 
    reorderItinerary, 
    clearItinerary, 
    updateItemTime 
  } = useItineraryStore();

  const itinerary = getUserItinerary(userId);
  
  const itemsByDay = itinerary.reduce((acc, item, index) => {
    const day = Math.floor(index / 4) + 1;
    if (!acc[day]) acc[day] = [];
    acc[day].push(item);
    return acc;
  }, {});

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
  });

  const handleBooking = async () => {
    try {
      // In a real application, you would make an API call here
      // For demonstration, we'll simulate an API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setBookingStatus({ show: true, success: true });
      setTimeout(() => setBookingStatus({ show: false, success: false }), 5000);
    } catch (error) {
      setBookingStatus({ show: true, success: false });
      setTimeout(() => setBookingStatus({ show: false, success: false }), 5000);
    }
  };

  // Previous handlers remain the same: handleRemoveItem, handleDragEnd, toggleItemExpansion
  const handleRemoveItem = (itemId) => {
        removeFromItinerary(userId, itemId);
      };
    
      const handleDragEnd = (result) => {
        if (!result.destination) return;
        const sourceDay = parseInt(result.source.droppableId.split('-')[1]);
        const destDay = parseInt(result.destination.droppableId.split('-')[1]);
        const oldIndex = result.source.index + (sourceDay - 1) * 4;
        const newIndex = result.destination.index + (destDay - 1) * 4;
        reorderItinerary(userId, oldIndex, newIndex);
      };
    
      const toggleItemExpansion = (itemId) => {
        setExpandedItems(prev => {
          const newSet = new Set(prev);
          if (newSet.has(itemId)) {
            newSet.delete(itemId);
          } else {
            newSet.add(itemId);
          }
          return newSet;
        });
      };

  return (
    <div className="max-w-6xl mx-auto bg-gradient-to-b from-gray-50 to-white rounded-2xl shadow-xl p-8 mt-8">
      <div className="flex justify-between items-center mb-8 pb-6 border-b border-gray-200">
        <h2 className="text-3xl font-bold text-gray-800">Travel Itinerary</h2>
        <div className="flex space-x-4">
          {itinerary.length > 0 && (
            <>
              {/* <button
                onClick={handlePrint}
                className="flex items-center px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors"
              >
                <Printer className="w-4 h-4 mr-2" />
                Print Itinerary
              </button>
              <button
                onClick={handleBooking}
                className="flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
              >
                <Mail className="w-4 h-4 mr-2" />
                Book & Send Confirmation
              </button> */}
              <button
                onClick={() => clearItinerary(userId)}
                className="flex items-center px-4 py-2 text-sm font-medium text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Clear Itinerary
              </button>
            </>
          )}
        </div>
      </div>

    

      <DragDropContext onDragEnd={handleDragEnd}>
        {Object.entries(itemsByDay).map(([day, items]) => (
          <DaySection
            key={day}
            day={day}
            items={items}
            onRemoveItem={handleRemoveItem}
            expandedItems={expandedItems}
            onToggleExpand={toggleItemExpansion}
            onUpdateTime={updateItemTime}
          />
        ))}
      </DragDropContext>

      <div style={{ display: 'none' }}>
        <PrintableItinerary ref={printRef} itemsByDay={itemsByDay} />
      </div>
    </div>
  );
};

export default Itinerary;