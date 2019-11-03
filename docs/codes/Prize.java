public class Prize {
    private String name;

    public Prize(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Override
    public int hashCode() {
        return name.hashCode();
    }

    @Override
    public boolean equals(Object o) {
        Prize p = (Prize) o;
        return p.getName().equals(name);
            
    }
}