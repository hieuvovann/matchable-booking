import { Session, Trainer } from "@/types/types";
import { useEffect, useState } from "react";
import { Skeleton } from "./ui/skeleton";
import { useNavigate } from "react-router";
import { Select, SelectContent, SelectItem, SelectTrigger } from "./ui/select";
import { MultiSelect } from "./ui/multi-select";
import { Button } from "./ui/button";
import { useSessionsQuery, useTrainersQuery } from "@/api/queries";

interface SessionCardProps {
  session: Session;
}

const SessionCard = ({ session }: SessionCardProps) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/your-bookings?sessionId=${session.id}`)}
      className="p-4 rounded-md shadow-sm space-y-2 bg-gray-50 w-[19%] h-[150px] flex flex-col items-center justify-center gap-3 hover:border-blue-400 border-2 transition cursor-pointer"
    >
      <p>
        <span className="font-medium">Session:</span> {session.name}
      </p>
      <p>
        <span className="font-medium">Trainer:</span>{" "}
        {session?.trainers?.map((trainer) => trainer.name).join(", ")}
      </p>
    </div>
  );
};

const AvailableSessions = () => {
  const { data: sessionsData, isLoading: isSessionsLoading } = useSessionsQuery();
  const sessions = sessionsData?.data || [];
  const { data: trainersData, isLoading: isTrainersLoading } = useTrainersQuery();
  const trainers = trainersData?.data || [];
  const isLoading = isSessionsLoading || isTrainersLoading;

  const [selectedSessionId, setSelectedSessionId] = useState<
    string | undefined
  >();
  const selectSession = sessions.find(
    (session: Session) => session.id === selectedSessionId
  );
  const [selectedTrainerIds, setSelectedTrainerIds] = useState<string[]>([]);
  const [filteredSessions, setFilteredSessions] = useState(sessions);

  const trainerList = trainers.map((trainer: Trainer) => ({
    value: trainer.id,
    label: trainer.name,
  }));

  useEffect(() => {
    if (isLoading) return;
    const filtered = sessions.filter((session: Session) => {
      const matchesSession =
        !selectedSessionId || session.id === selectedSessionId;
      const matchesTrainer =
        selectedTrainerIds.length === 0 ||
        session.trainers.some((trainer) =>
          selectedTrainerIds.includes(trainer.id)
        );
      return matchesSession && matchesTrainer;
    });
    setFilteredSessions(filtered);
  }, [selectedSessionId, selectedTrainerIds, sessions, isLoading]);

  return (
    <div>
      <h1 className="text-xl font-semibold mb-2">Available Sessions</h1>
      <div className="flex space-x-4 mb-6">
        <Select
          value={selectedSessionId}
          onValueChange={(value) => setSelectedSessionId(value)}
        >
          <SelectTrigger className="w-[200px] h-[40px] border-0 shadow hover:border-blue-500">
            {selectedSessionId ? selectSession?.name : "Select Session Type"}
          </SelectTrigger>
          <SelectContent>
            {sessions.map((session: Session) => (
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
                setSelectedSessionId(undefined);
              }}
            >
              Clear
            </Button>
          </SelectContent>
        </Select>
        <MultiSelect
          options={trainerList}
          onValueChange={setSelectedTrainerIds}
          defaultValue={selectedTrainerIds}
          placeholder="Select trainers"
          variant="inverted"
          animation={2}
          maxCount={3}
          className="w-[300px] shadow"
        />
      </div>
      <div className="flex space-x-4">
        {!isLoading
          ? filteredSessions.map((session: Session) => (
              <SessionCard key={session.id} session={session} />
            ))
          : [1, 2, 3, 4, 5].map((_, index) => (
              <Skeleton key={index} className="w-[19%] h-[150px]" />
            ))}
      </div>
    </div>
  );
};

export default AvailableSessions;
