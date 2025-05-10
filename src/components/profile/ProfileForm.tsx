
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";

type Skill = {
  id: string;
  name: string;
  category: string;
};

const ProfileForm = () => {
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [photo, setPhoto] = useState<File | null>(null);
  const [skillsOffered, setSkillsOffered] = useState<Skill[]>([]);
  const [skillsWanted, setSkillsWanted] = useState<Skill[]>([]);
  const [newOfferedSkill, setNewOfferedSkill] = useState("");
  const [newWantedSkill, setNewWantedSkill] = useState("");

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPhoto(e.target.files[0]);
    }
  };

  const addSkillOffered = () => {
    if (newOfferedSkill.trim()) {
      setSkillsOffered([
        ...skillsOffered,
        { id: Date.now().toString(), name: newOfferedSkill, category: "other" },
      ]);
      setNewOfferedSkill("");
    }
  };

  const addSkillWanted = () => {
    if (newWantedSkill.trim()) {
      setSkillsWanted([
        ...skillsWanted,
        { id: Date.now().toString(), name: newWantedSkill, category: "other" },
      ]);
      setNewWantedSkill("");
    }
  };

  const removeSkillOffered = (id: string) => {
    setSkillsOffered(skillsOffered.filter((skill) => skill.id !== id));
  };

  const removeSkillWanted = (id: string) => {
    setSkillsWanted(skillsWanted.filter((skill) => skill.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Placeholder for profile update logic
    console.log({ name, bio, neighborhood, photo, skillsOffered, skillsWanted });
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Your Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                required
              />
            </div>

            <div className="flex-1 space-y-2">
              <Label htmlFor="neighborhood">Neighborhood</Label>
              <Input
                id="neighborhood"
                value={neighborhood}
                onChange={(e) => setNeighborhood(e.target.value)}
                placeholder="Downtown"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="photo">Profile Photo</Label>
            <Input
              id="photo"
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Tell us a bit about yourself..."
              className="min-h-[100px]"
            />
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-medium">Skills You Offer</h3>
            <div className="flex gap-2">
              <Input
                value={newOfferedSkill}
                onChange={(e) => setNewOfferedSkill(e.target.value)}
                placeholder="Add a skill you can teach"
                className="flex-1"
              />
              <Button type="button" onClick={addSkillOffered}>
                Add
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {skillsOffered.map((skill) => (
                <div
                  key={skill.id}
                  className="flex items-center bg-primary/10 rounded-full px-3 py-1"
                >
                  <span>{skill.name}</span>
                  <button
                    type="button"
                    onClick={() => removeSkillOffered(skill.id)}
                    className="ml-2 text-sm text-gray-500 hover:text-gray-700"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-medium">Skills You Want</h3>
            <div className="flex gap-2">
              <Input
                value={newWantedSkill}
                onChange={(e) => setNewWantedSkill(e.target.value)}
                placeholder="Add a skill you want to learn"
                className="flex-1"
              />
              <Button type="button" onClick={addSkillWanted}>
                Add
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {skillsWanted.map((skill) => (
                <div
                  key={skill.id}
                  className="flex items-center bg-secondary/10 rounded-full px-3 py-1"
                >
                  <span>{skill.name}</span>
                  <button
                    type="button"
                    onClick={() => removeSkillWanted(skill.id)}
                    className="ml-2 text-sm text-gray-500 hover:text-gray-700"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-4">
          <Button type="submit" className="w-full sm:w-auto">
            Save Profile
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ProfileForm;
