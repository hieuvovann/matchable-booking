import { useEffect, useState } from "react";
import { add, format } from "date-fns";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Cart, Session, Trainer } from "@/types/types";
import { useSearchParams } from "react-router";
import { useBookingsQuery, useSessionsQuery } from "@/api/queries";
import { toast } from "react-toastify";

interface Booking {
  trainerSession: {
    costPerHour: number;
    session: Session;
    trainer: Trainer;
  };
  startDate: Date;
  duration: number;
}

interface BookingCardProps {
  booking: Booking;
}

const getHourDisplay = (hour: string | number) => {
  return `${hour} Hour${Number(hour) > 1 ? "s" : ""}`;
};

const BookingCard = ({ booking }: BookingCardProps) => {
  const cost =
    Number(booking.trainerSession.costPerHour) * Number(booking.duration);
  return (
    <div className="p-4 border rounded-md shadow-sm space-y-2 bg-gray-50 w-[19%] h-[216px]">
      <p>
        <span className="font-medium">Session:</span>{" "}
        {booking.trainerSession?.session?.name}
      </p>
      <p>
        <span className="font-medium">Trainer:</span>{" "}
        {booking?.trainerSession?.trainer?.name}
      </p>
      <p>
        <span className="font-medium">Start Date:</span>{" "}
        {format(booking.startDate, "yyyy-MM-dd")}
      </p>
      <p>
        <span className="font-medium">Start Time:</span>{" "}
        {format(booking?.startDate, "HH:mm")}
      </p>
      <p>
        <span className="font-medium">Duration:</span>{" "}
        {getHourDisplay(booking?.duration)}
      </p>
      <p>
        <span className="font-medium">Cost:</span> {cost}$
      </p>
    </div>
  );
};

interface YourBookingsProps {
  cartList: Cart[];
  setCartList: (value: Cart[]) => void;
  selectedSession?: Session;
}

function YourBookings({ cartList, setCartList }: YourBookingsProps) {
  const { data: bookingsData, isLoading: isBookingsLoading } =
    useBookingsQuery();
  const { data: sessionsData, isLoading: isSessionsLoading } =
    useSessionsQuery();
  const availableSessions = sessionsData?.data || [];

  const bookings = bookingsData?.data || [];

  const [searchParams] = useSearchParams();
  const sessionIdFromURL = searchParams.get("sessionId") || "";

  const [selectedSessionId, setSelectedSessionId] =
    useState<string>(sessionIdFromURL);

  const [selectedSession, setSelectedSession] = useState<Session | undefined>(
    undefined
  );
  const [startDate, setStartDate] = useState("");
  const [selectedDuration, setSelectedDuration] = useState<string>("1");
  const [selectedTrainerId, setSelectedTrainerId] = useState("");
  const selectedTrainer = selectedSession?.trainers.find(
    (trainer: Trainer) => trainer.id === selectedTrainerId
  );
  const isLoading = isBookingsLoading || isSessionsLoading;

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    if (availableSessions.length > 0 && selectedSessionId) {
      const session = availableSessions.find(
        (session: Session) => session.id.toString() === selectedSessionId.toString()
      );
      setSelectedSession(session);
    } else {
      setSelectedSession(undefined);
    }
  }, [availableSessions, selectedSessionId, searchParams]);

  const handleAddToCart = () => {
    if (
      !selectedSession ||
      !startDate ||
      !selectedDuration ||
      !selectedTrainer
    ) {
      alert("Please fill all fields.");
      return;
    }

    const startDateTime = new Date(startDate);
    const endDateTime = add(startDateTime, { hours: Number(selectedDuration) });

    const sessionDetails = {
      sessionType: selectedSession.name,
      startDate: startDateTime.toISOString(),
      endTime: endDateTime.toISOString(),
      trainer: selectedTrainer.name,
      duration: Number(selectedDuration),
      price: Number(selectedTrainer?.costPerHour) * Number(selectedDuration),
      trainerId: selectedTrainer.id,
      sessionId: selectedSession.id,
    };

    toast("Session added to cart", { type: "success" });

    setCartList([...cartList, sessionDetails]);
    setSelectedSessionId("");
    setStartDate("");
    setSelectedDuration("1");
    setSelectedTrainerId("");
  };

  return (
    <div className="space-y-6">
      {/* Available Bookings */}
      <div>
        <h2 className="text-lg font-semibold mb-2">Your Bookings</h2>
        {bookings.length === 0 && !isLoading ? (
          <p className="text-sm text-gray-500">No bookings found.</p>
        ) : (
          <div className="flex flex-wrap gap-x-[1%] gap-y-4">
            {!isLoading
              ? bookings.map((booking: Booking, index: number) => (
                  <BookingCard key={index} booking={booking} />
                ))
              : [1, 2, 3, 4, 5].map((index) => (
                  <Skeleton key={index} className="w-[19%] h-[216px]" />
                ))}
          </div>
        )}
      </div>
      {/* Session Selection Form */}
      <div
        className={`space-y-4 w-2/3 ml-auto mr-auto transform transition duration-500 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
        }`}
      >
        <h2 className="text-lg font-bold">Book your own session</h2>
        <div>
          <Label className="block mb-2 text-sm font-medium">Session</Label>
          <Select
            value={selectedSessionId}
            onValueChange={(value) => setSelectedSessionId(value)}
          >
            <SelectTrigger className="w-full">
              {selectedSessionId ? selectedSession?.name : "Select Session Type"}
            </SelectTrigger>
            <SelectContent>
              {availableSessions.map((session: Session) => (
                <SelectItem key={session.id} value={session.id}>
                  {session.name}
                </SelectItem>
              ))}
              <Button
                className="w-full px-2"
                variant="secondary"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedSessionId("");
                }}
              >
                Clear
              </Button>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label className="block mb-2 text-sm font-medium">
            Select Trainer
          </Label>
          <Select
            value={selectedTrainerId}
            onValueChange={(value) => setSelectedTrainerId(value)}
            disabled={!selectedSessionId}
          >
            <SelectTrigger className="w-full">
              {selectedTrainerId ? selectedTrainer?.name : "Select Trainer"}
            </SelectTrigger>
            <SelectContent>
              {selectedSession?.trainers.map((trainer: Trainer) => (
                <SelectItem key={trainer.id} value={trainer.id}>
                  {trainer.name}
                </SelectItem>
              ))}
              <Button
                className="w-full px-2"
                variant="secondary"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedTrainerId("");
                }}
              >
                Clear
              </Button>
            </SelectContent>
          </Select>
        </div>
        <Label className="block text-sm font-medium">Time and Duration</Label>
        <div className="flex space-x-4">
          <div className="w-1/2 -mt-2">
            <Input
              type="datetime-local"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full"
            />
          </div>
          <div className="w-1/2 -mt-2">
            <Select onValueChange={(value) => setSelectedDuration(value)}>
              <SelectTrigger className="w-full">
                {/* <SelectValue placeholder="Select Duration (Hours)" /> */}
                {selectedDuration
                  ? getHourDisplay(selectedDuration)
                  : "Select Duration (Hours)"}
              </SelectTrigger>
              <SelectContent>
                {[1, 2, 3, 4].map((hour) => (
                  <SelectItem key={hour} value={hour.toString()}>
                    {getHourDisplay(hour)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div>
          Cost:{" "}
          {selectedTrainerId
            ? Number(selectedTrainer?.costPerHour) * Number(selectedDuration)
            : ""}
          $
        </div>
        <div>
          <Button
            onClick={handleAddToCart}
            disabled={
              !selectedSession ||
              !startDate ||
              !selectedDuration ||
              !selectedTrainer
            }
            className="w-full"
          >
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
}

export default YourBookings;
